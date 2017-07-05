import test from 'ava';

import createState from '../../../src/vuex-crud/createState';

test('creates store with fetch list props', (t) => {
  t.deepEqual(createState({ only: ['FETCH_LIST'] }), {
    list: [],
    entities: {},

    isFetchingList: false,
    fetchListError: null
  });
});

test('creates store with fetch single props', (t) => {
  t.deepEqual(createState({ only: ['FETCH_SINGLE'] }), {
    list: [],
    entities: {},

    isFetchingSingle: false,
    fetchSingleError: null
  });
});

test('creates store with create props', (t) => {
  t.deepEqual(createState({ only: ['CREATE'] }), {
    list: [],
    entities: {},

    isCreating: false,
    createError: null
  });
});

test('creates store with update props', (t) => {
  t.deepEqual(createState({ only: ['UPDATE'] }), {
    list: [],
    entities: {},

    isUpdating: false,
    updateError: null
  });
});

test('creates store with replace props', (t) => {
  t.deepEqual(createState({ only: ['REPLACE'] }), {
    list: [],
    entities: {},

    isReplacing: false,
    replaceError: null
  });
});

test('creates store with destroy props', (t) => {
  t.deepEqual(createState({ only: ['DESTROY'] }), {
    list: [],
    entities: {},

    isDestroying: false,
    destroyError: null
  });
});

test('returns all properties', (t) => {
  t.deepEqual(createState({ only: ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY'] }), {
    list: [],
    entities: {},

    isFetchingList: false,
    fetchListError: null,

    isFetchingSingle: false,
    fetchSingleError: null,

    isCreating: false,
    createError: null,

    isUpdating: false,
    updateError: null,

    isReplacing: false,
    replaceError: null,

    isDestroying: false,
    destroyError: null
  });
});

test('enhances state', (t) => {
  t.deepEqual(createState({ state: { foo: 'bar', list: [1] }, only: ['FETCH_LIST', 'CREATE'] }), {
    foo: 'bar',

    list: [1],
    entities: {},

    isFetchingList: false,
    fetchListError: null,

    isCreating: false,
    createError: null
  });
});
