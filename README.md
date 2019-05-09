# Vuex-CRUD

[![Build Status](https://travis-ci.org/JiriChara/vuex-crud.svg?branch=master)](https://travis-ci.org/JiriChara/vuex-crud)
[![codecov](https://codecov.io/gh/JiriChara/vuex-crud/branch/master/graph/badge.svg)](https://codecov.io/gh/JiriChara/vuex-crud)
[![npm](https://img.shields.io/npm/v/vuex-crud.svg)](https://www.npmjs.com/package/vuex-crud)
[![npm](https://img.shields.io/npm/dm/vuex-crud.svg)](https://www.npmjs.com/package/vuex-crud)

## Introduction

**Vuex-CRUD** is a library for Vuex which helps you to build CRUD modules easily.

## Installation

```
yarn add vuex-crud
```

OR

```
npm install vuex-crud
```

**Vuex-CRUD** uses `Array.prototype.includes`, `Object.assign` and `Promise`. Make sure hat your project use polyfill for those if you want to support older browsers! Look at here: https://babeljs.io/docs/usage/polyfill/ for more info.

## Basic Usage

1) Create your first CRUD resource:

```js
// src/store/articles

import createCrudModule from 'vuex-crud';

export default createCrudModule({
  resource: 'articles'
});
```

2) Register your CRUD resource in your store:

```js
// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

import articles from '@/store/articles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  modules: {
    articles
  }
});
```

3) Use it in your components:

```vue
<!-- src/components/Articles -->

<template>
  <main>
    <article v-for="article in articleList">
      <h1>{{ article.title }}</h1>
      <p>{{ article.content }}</p>
    </article>
  </main>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    name: 'articles',

    computed: {
      ...mapGetters('articles', {
        articleList: 'list'
      }),

      ...mapState([
        'route', // vuex-router-sync
      ]),
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList'
      }),

      fetchData() {
        return this.fetchArticles();
      }
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    }
  };
</script>
```

```vue
<!-- src/components/Article -->

<template>
  <main>
    <article v-if="currentArticle">
      <h1>{{ currentArticle.title }}</h1>
      <p>{{ currentArticle.content }}</p>
    </article>
  </main>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    name: 'article',

    computed: {
      ...mapGetters('articles', {
        articleById: 'byId'
      }),

      ...mapState([
        'route', // vuex-router-sync
      ]),

      currentArticle() {
        return this.articleById(this.route.params.id);
      }
    },

    methods: {
      ...mapActions('articles', {
        fetchArticle: 'fetchSingle'
      }),

      fetchData() {
        return this.fetchArticle({
          id: this.route.params.id
        });
      }
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    }
  };
</script>
```

## Advanced Usage

The following options are available when creating new Vuex-CRUD module:

```js
import createCrudModule, { client } from 'vuex-crud';

export default createCrudModule({
  resource: 'articles', // The name of your CRUD resource (mandatory)
  idAttribute: 'id', // What should be used as ID
  urlRoot: '/api/articles', // The url to fetch the resource
  state: {}, // Initial state. It will override state generated by Vuex-CRUD
  actions: {}, // Initial actions It will override actions generated by Vuex-CRUD
  mutations: {}, // Initial mutations. It will override mutations generated by Vuex-CRUD
  getters: {}, // Initial getters. It will override getters generated by Vuex-CRUD
  client, // Axios client that should be used for API request
  onFetchListStart: () => {}, // Callback for collection GET start
  onFetchListSuccess: () => {}, // Callback for collection GET success
  onFetchListError: () => {}, // Callback for collection GET error
  onFetchSingleStart: () => {}, // Callback for single GET start
  onFetchSingleSuccess: () => {}, // Callback for single GET success
  onFetchSingleError: () => {}, // Callback for single GET error
  onCreateStart: () => {}, // Callback for POST start
  onCreateSuccess: () => {}, // Callback for POST success
  onCreateError: () => {}, // Callback for POST error
  onUpdateStart: () => {}, // Callback for PATCH start
  onUpdateSuccess: () => {}, // Callback for PATCH success
  onUpdateError: () => {}, // Callback for PATCH error
  onReplaceStart: () => {}, // Callback for PUT start
  onReplaceSuccess: () => {}, // Callback for PUT success
  onReplaceError: () => {}, // Callback for PUT error
  onDestroyStart: () => {}, // Callback for DELETE start
  onDestroySuccess: () => {}, // Callback for DELETE success
  onDestroyError: () => {}, // Callback for DELETE error
  only: [
    'FETCH_LIST',
    'FETCH_SINGLE',
    'CREATE',
    'UPDATE',
    'REPLACE',
    'DESTROY'
  ], // What CRUD actions should be available
  parseList: res => res, // Method used to parse collection
  parseSingle: res => res, // Method used to parse single resource
  parseError: res => res // Method used to parse error
});
```

### Nested Resources

**Vuex-CRUD** is designed mainly for flatten APIs like:

```
/api/articles/
/api/users/1
/api/pages?byBook=1
```

but it also supports nested resources like:

```
/api/books/1/pages/10
/api/users/john/tasks/15
```

However your store will always be flattened and will look similar to this:

```js
{
  books: {
    entities: {
      '1': {
        // ...
      }
    }
  },
  pages: {
    entities: {
      '1': {
        // ...
      },
      '2': {
        // ...
      },
      '3': {
        // ...
      }
    },
    list: ['1', '2', '3']
  },
}
```

There are 2 possible ways to implement provide custom URL:

1) Provide custom url for each request:

```js
fetchList({ customUrl: '/api/books/1/pages' });
fetchSingle({ customUrl: '/api/books/1/pages/1' });
create({ data: { content: '...' }, customUrl: '/api/books/1/pages' });
update({ data: { content: '...' }, customUrl: '/api/books/1/pages/1' });
replace({ data: { content: '...' }, customUrl: '/api/books/1/pages/1' });
destroy({ customUrl: '/api/books/1/pages/1' });
```

2) Define a getter for custom url:

```js
import createCrudModule from 'vuex-crud';

export default createCrudModule({
  resource: 'pages',
  customUrlFn(id, type, bookId) {
    // id will only be available when doing request to single resource, otherwise null
    // type is the actions you are dispatching: FETCH_LIST, FETCH_SINGLE, CREATE, UPDATE, REPLACE, DESTROY
    const rootUrl = `/api/books/${bookId}`;
    return id ? `${rootUrl}/${id}` : rootUrl;
  }
});
```

and your requests will look this:

```js
const id = 2;
const bookId = 1;

fetchList({ customUrlFnArgs: bookId });
fetchSingle({ id, customUrlFnArgs: bookId });
create({ data: { content: '...' }, customUrlFnArgs: bookId });
update({ id, data: { content: '...' }, customUrlFnArgs: bookId });
replace({ id, data: { content: '...' }, customUrlFnArgs: bookId });
destroy({ id, customUrlFnArgs: bookId });
```


### Custom client

**Vuex-CRUD** is using axios for API requests. If you want to customize interceptors or something else, then you can do following:

```js
import createCrudModule, { client } from 'vuex-crud';
import authInterceptor from './authInterceptor';

client.interceptors.request.use(authInterceptor);

createCrudModule({
  resource: 'comments',
  client
});
```

### Parsing Data from Your API

You can provide a custom methods to parse data from your API:

```js
import createCrudModule from 'vuex-crud';

createCrudModule({
  resource: 'articles',

  parseList(response) {
    const { data } = response;

    return Object.assign({}, response, {
      data: data.result // expecting array of objects with IDs
    });
  },

  parseSingle(response) {
    const { data } = response;

    return Object.assign({}, response, {
      data: data.result // expecting object with ID
    });
  }
});
```

### Getters

Vuex-CRUD ships with following getters:

* `list()` returns list of resources
* `byId(id)` returns resource by ID

### Actions

Vuex-CRUD ships with following actions (config is configuration for axios):

```js
{
  // GET /api/<resourceName>
  fetchList({ commit }, { config } = {}) {
    // ...
  },

  // GET /api/<resourceName>/:id
  fetchSingle({ commit }, { id, config } = {}) {
    // ...
  },

  // POST /api/<resourceName>
  create({ commit }, { data, config } = {}) {
    // ...
  },

  // PATCH /api/<resouceName>/:id
  update({ commit }, { id, data, config } = {}) {
    // ...
  },

  // PUT /api/<resouceName>/:id
  replace({ commit }, { id, data, config } = {}) {
    // ...
  },

  // DELETE /api/<resouceName>/:id
  destroy({ commit }, { id, config } = {}) {
    // ...
  },
}
```

## Usage with Nuxt

`vuex-crud` works with Nuxt modules system as well. You can simply define your Nuxt modules as following:

```js
import createCRUDModule from 'vuex-crud';

const crudModule = createCRUDModule({
  resource: 'articles'
});

const state = () => crudModule.state;

const { actions, mutations, getters } = crudModule;

export {
  state,
  actions,
  mutations,
  getters
};
```

and then use it in your component:

```js
export default {
  computed: {
    ...mapGetters('articles', {
      articleList: 'list'
    })
  },

  fetch({ store }) {
    store.dispatch('articles/fetchList');
  }
};
```

## License

The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright

Copyright © 2017 Jiří Chára. All Rights Reserved.
