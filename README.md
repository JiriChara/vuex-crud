# vuex-crud

## Introduction

**vuex-crud** is a library for Vuex which helps you to build CRUD modules easily.

## Instaliation

```
yarn add vuex-crud
```

or if you are old-school:

```
npm install vuex-crud
```

## Usage

1) Create your first CRUD resource:

```js
// src/store/articles

import { createCrud } from 'vuex-crud';

export createCrud({
  resource: 'articles',
  urlRoot: '/api/articles'
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'articles',

    computed: {
      ...mapGetters('articles', {
        articleList: 'list'
      })
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList'
      }),

      fetchData() {
        return this.fetchArticles(this.route.query);
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

## License

The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright

Copyright © 2017 Jiří Chára. All Rights Reserved.
