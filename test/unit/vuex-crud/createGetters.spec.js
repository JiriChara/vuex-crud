import test from 'ava';
import Vue from 'vue';
import Vuex from 'vuex';

import createGetters from '../../../src/vuex-crud/createGetters';

test('has list getter', (t) => {
  const { list } = createGetters();

  t.truthy(list);
});

test('has singles getter', (t) => {
  const { singles } = createGetters();

  t.truthy(singles);
});

test('has byId getter', (t) => {
  const { byId } = createGetters();

  t.truthy(byId);
});

test('has isLoading getter', (t) => {
  const { isLoading } = createGetters();

  t.truthy(isLoading);
});

// List

test('returns list of resources', (t) => {
  const state = {
    list: [
      '1', '2', '3'
    ],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  const { list } = createGetters();

  t.deepEqual(list(state), [
    {
      id: 1,
      name: 'John'
    },
    {
      id: 2,
      name: 'Bob'
    },
    {
      id: 3,
      name: 'Jane'
    }
  ]);
});

test('returns empty list when no reources in the state list', (t) => {
  const state = {
    list: [],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  const { list } = createGetters({}, 'id');

  t.deepEqual(list(state), []);
});

// Singles

test('returns list of single resources', (t) => {
  const state = {
    singles: [
      '1', '2', '3'
    ],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  const { singles } = createGetters({}, 'id');

  t.deepEqual(singles(state), [
    {
      id: 1,
      name: 'John'
    },
    {
      id: 2,
      name: 'Bob'
    },
    {
      id: 3,
      name: 'Jane'
    }
  ]);
});

test('returns empty list when no reources in the state singles', (t) => {
  const state = {
    singles: [],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  const { singles } = createGetters();

  t.deepEqual(singles(state), []);
});

// By ID

test('returns a resource by ID', (t) => {
  const state = {
    singles: [
      '1', '2', '3'
    ],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters({ idAttribute: 'id' })
  });

  t.deepEqual(getters.byId(1), { id: 1, name: 'John' });
  t.deepEqual(getters.byId(2), { id: 2, name: 'Bob' });
  t.deepEqual(getters.byId(3), { id: 3, name: 'Jane' });
});

test('returns null if resouce by ID not found', (t) => {
  const state = {
    singles: [],
    entities: {
      1: {
        id: 1,
        name: 'John'
      },
      2: {
        id: 2,
        name: 'Bob'
      },
      3: {
        id: 3,
        name: 'Jane'
      }
    }
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters({ idAttribute: 'id' })
  });

  t.is(getters.byId(1), null);
  t.deepEqual(getters.byId(2), null);
  t.deepEqual(getters.byId(3), null);
});

test('finds resource by slug', (t) => {
  const state = {
    singles: [1, 2, 3],

    entities: {
      1: {
        slug: 1,
        name: 'John'
      },
      2: {
        slug: 2,
        name: 'Bob'
      },
      3: {
        slug: 3,
        name: 'Jane'
      }
    }
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters({ idAttribute: 'slug' })
  });

  t.deepEqual(getters.byId(1), { slug: 1, name: 'John' });
  t.deepEqual(getters.byId(2), { slug: 2, name: 'Bob' });
  t.deepEqual(getters.byId(3), { slug: 3, name: 'Jane' });
});

// Loading

test('returns true if isFetchingList is true', (t) => {
  const state = {
    isFetchingList: true,
    isFetchingSingle: false,
    isCreating: false,
    isUpdating: false,
    isReplacing: false,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns true if isFetchingSingle is true', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: true,
    isCreating: false,
    isUpdating: false,
    isReplacing: false,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns true if isCreating is true', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: false,
    isCreating: true,
    isUpdating: false,
    isReplacing: false,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns true if isUpdating is true', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: false,
    isCreating: false,
    isUpdating: true,
    isReplacing: false,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns true if isReplacing is true', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: false,
    isCreating: false,
    isUpdating: false,
    isReplacing: true,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns true if isDestroying is true', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: false,
    isCreating: false,
    isUpdating: false,
    isReplacing: false,
    isDestroying: true
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.true(getters.isLoading);
});

test('returns false not loading', (t) => {
  const state = {
    isFetchingList: false,
    isFetchingSingle: false,
    isCreating: false,
    isUpdating: false,
    isReplacing: false,
    isDestroying: false
  };

  Vue.use(Vuex);

  const { getters } = new Vuex.Store({
    state,
    getters: createGetters()
  });

  t.false(getters.isLoading);
});
