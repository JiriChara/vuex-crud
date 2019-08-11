import test from 'ava';

import createMutations from '../../../src/vuex-crud/createMutations';

// FETCH_LIST

test('add mutations for fetch list', (t) => {
  const mutations = createMutations({
    only: ['FETCH_LIST']
  });

  t.truthy(mutations.fetchListStart);
  t.truthy(mutations.fetchListSuccess);
  t.truthy(mutations.fetchListError);

  t.falsy(mutations.fetchSingleStart);
  t.falsy(mutations.fetchSingleSuccess);
  t.falsy(mutations.fetchSingleError);

  t.falsy(mutations.createStart);
  t.falsy(mutations.createSuccess);
  t.falsy(mutations.createError);

  t.falsy(mutations.updateStart);
  t.falsy(mutations.updateSuccess);
  t.falsy(mutations.updateError);

  t.falsy(mutations.replaceStart);
  t.falsy(mutations.replaceSuccess);
  t.falsy(mutations.replaceError);

  t.falsy(mutations.destroyStart);
  t.falsy(mutations.destroySuccess);
  t.falsy(mutations.destroyError);
});

test('fetch list start', (t) => {
  const { fetchListStart } = createMutations({
    only: ['FETCH_LIST'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  fetchListStart(initialState);

  t.is(initialState.isFetchingList, true);
});

test('fetch list success', (t) => {
  const { fetchListSuccess } = createMutations({
    only: ['FETCH_LIST'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const data = [
    { id: 1 },
    { id: 2 }
  ];

  fetchListSuccess(initialState, { data });

  t.is(initialState.isFetchingList, false);

  t.is(initialState.fetchListError, null);

  t.is(initialState.entities['1'], data[0]);
  t.is(initialState.entities['2'], data[1]);

  t.deepEqual(initialState.list, ['1', '2']);
});

test('fetch list error', (t) => {
  const { fetchListError } = createMutations({
    only: ['FETCH_LIST'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  fetchListError(initialState, error);

  t.is(initialState.isFetchingList, false);

  t.is(initialState.fetchListError, error);

  t.deepEqual(initialState.list, []);
});

// FETCH_SINGLE

test('add mutations for fetch single', (t) => {
  const mutations = createMutations({
    only: ['FETCH_SINGLE']
  });

  t.falsy(mutations.fetchListStart);
  t.falsy(mutations.fetchListSuccess);
  t.falsy(mutations.fetchListError);

  t.truthy(mutations.fetchSingleStart);
  t.truthy(mutations.fetchSingleSuccess);
  t.truthy(mutations.fetchSingleError);

  t.falsy(mutations.createStart);
  t.falsy(mutations.createSuccess);
  t.falsy(mutations.createError);

  t.falsy(mutations.updateStart);
  t.falsy(mutations.updateSuccess);
  t.falsy(mutations.updateError);

  t.falsy(mutations.replaceStart);
  t.falsy(mutations.replaceSuccess);
  t.falsy(mutations.replaceError);

  t.falsy(mutations.destroyStart);
  t.falsy(mutations.destroySuccess);
  t.falsy(mutations.destroyError);
});

test('fetch single start', (t) => {
  const { fetchSingleStart } = createMutations({
    only: ['FETCH_SINGLE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  fetchSingleStart(initialState);

  t.is(initialState.isFetchingSingle, true);
});

test('fetch single success not in the list', (t) => {
  const { fetchSingleSuccess } = createMutations({
    only: ['FETCH_SINGLE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const data = { id: 1 };

  fetchSingleSuccess(initialState, { data });

  t.is(initialState.isFetchingSingle, false);

  t.is(initialState.fetchSingleError, null);

  t.is(initialState.entities['1'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('fetch single success in the list', (t) => {
  const { fetchSingleSuccess } = createMutations({
    only: ['FETCH_SINGLE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const data = { id: 1 };

  fetchSingleSuccess(initialState, { data });

  t.is(initialState.isFetchingSingle, false);

  t.is(initialState.fetchSingleError, null);

  t.is(initialState.entities['1'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('fetch single error', (t) => {
  const { fetchSingleError } = createMutations({
    only: ['FETCH_SINGLE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  fetchSingleError(initialState, error);

  t.is(initialState.isFetchingSingle, false);

  t.is(initialState.fetchSingleError, error);

  t.deepEqual(initialState.list, initialState.list);
  t.deepEqual(initialState.entities, initialState.entities);
});

// CREATE

test('add mutations for create', (t) => {
  const mutations = createMutations({
    only: ['CREATE']
  });

  t.falsy(mutations.fetchListStart);
  t.falsy(mutations.fetchListSuccess);
  t.falsy(mutations.fetchListError);

  t.falsy(mutations.fetchSingleStart);
  t.falsy(mutations.fetchSingleSuccess);
  t.falsy(mutations.fetchSingleError);

  t.truthy(mutations.createStart);
  t.truthy(mutations.createSuccess);
  t.truthy(mutations.createError);

  t.falsy(mutations.updateStart);
  t.falsy(mutations.updateSuccess);
  t.falsy(mutations.updateError);

  t.falsy(mutations.replaceStart);
  t.falsy(mutations.replaceSuccess);
  t.falsy(mutations.replaceError);

  t.falsy(mutations.destroyStart);
  t.falsy(mutations.destroySuccess);
  t.falsy(mutations.destroyError);
});

test('create start', (t) => {
  const { createStart } = createMutations({
    only: ['CREATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  createStart(initialState);

  t.is(initialState.isCreating, true);
});

test('create success', (t) => {
  const { createSuccess } = createMutations({
    only: ['CREATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const data = { id: 2 };

  createSuccess(initialState, { data });

  t.is(initialState.isCreating, false);

  t.is(initialState.createError, null);

  t.is(initialState.entities['2'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('create success without providing a data object', (t) => {
  const { createSuccess } = createMutations({
    only: ['CREATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const data = null;

  createSuccess(initialState, { data });

  t.is(initialState.isCreating, false);

  t.is(initialState.createError, null);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('create error', (t) => {
  const { createError } = createMutations({
    only: ['CREATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  createError(initialState, error);

  t.is(initialState.isCreating, false);

  t.is(initialState.createError, error);

  t.deepEqual(initialState.list, initialState.list);
  t.deepEqual(initialState.entities, initialState.entities);
});

// UPDATE

test('add mutations for update', (t) => {
  const mutations = createMutations({
    only: ['UPDATE']
  });

  t.falsy(mutations.fetchListStart);
  t.falsy(mutations.fetchListSuccess);
  t.falsy(mutations.fetchListError);

  t.falsy(mutations.fetchSingleStart);
  t.falsy(mutations.fetchSingleSuccess);
  t.falsy(mutations.fetchSingleError);

  t.falsy(mutations.createStart);
  t.falsy(mutations.createSuccess);
  t.falsy(mutations.createError);

  t.truthy(mutations.updateStart);
  t.truthy(mutations.updateSuccess);
  t.truthy(mutations.updateError);

  t.falsy(mutations.replaceStart);
  t.falsy(mutations.replaceSuccess);
  t.falsy(mutations.replaceError);

  t.falsy(mutations.destroyStart);
  t.falsy(mutations.destroySuccess);
  t.falsy(mutations.destroyError);
});

test('update start', (t) => {
  const { updateStart } = createMutations({
    only: ['UPDATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  updateStart(initialState);

  t.is(initialState.isUpdating, true);
});

test('update success existing in list', (t) => {
  const { updateSuccess } = createMutations({
    only: ['UPDATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        name: 'Bob'
      }
    }
  };

  const data = { id: 1, name: 'John' };

  updateSuccess(initialState, { data });

  t.is(initialState.isUpdating, false);

  t.is(initialState.updateError, null);

  t.is(initialState.entities['1'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('update success not existing in list', (t) => {
  const { updateSuccess } = createMutations({
    only: ['UPDATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        name: 'Bob'
      }
    }
  };

  const data = { id: 2, name: 'John' };

  updateSuccess(initialState, { data });

  t.is(initialState.isUpdating, false);

  t.is(initialState.updateError, null);

  t.is(initialState.entities['2'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('update error', (t) => {
  const { updateError } = createMutations({
    only: ['UPDATE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  updateError(initialState, error);

  t.is(initialState.isUpdating, false);

  t.is(initialState.updateError, error);

  t.deepEqual(initialState.list, initialState.list);
  t.deepEqual(initialState.entities, initialState.entities);
});

// REPLACE

test('add mutations for replace', (t) => {
  const mutations = createMutations({
    only: ['REPLACE']
  });

  t.falsy(mutations.fetchListStart);
  t.falsy(mutations.fetchListSuccess);
  t.falsy(mutations.fetchListError);

  t.falsy(mutations.fetchSingleStart);
  t.falsy(mutations.fetchSingleSuccess);
  t.falsy(mutations.fetchSingleError);

  t.falsy(mutations.createStart);
  t.falsy(mutations.createSuccess);
  t.falsy(mutations.createError);

  t.falsy(mutations.updateStart);
  t.falsy(mutations.updateSuccess);
  t.falsy(mutations.updateError);

  t.truthy(mutations.replaceStart);
  t.truthy(mutations.replaceSuccess);
  t.truthy(mutations.replaceError);

  t.falsy(mutations.destroyStart);
  t.falsy(mutations.destroySuccess);
  t.falsy(mutations.destroyError);
});

test('replace start', (t) => {
  const { replaceStart } = createMutations({
    only: ['REPLACE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  replaceStart(initialState);

  t.is(initialState.isReplacing, true);
});

test('replace success existing in list', (t) => {
  const { replaceSuccess } = createMutations({
    only: ['REPLACE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        name: 'Bob'
      }
    }
  };

  const data = { id: 1, name: 'John' };

  replaceSuccess(initialState, { data });

  t.is(initialState.isReplacing, false);

  t.is(initialState.replaceError, null);

  t.is(initialState.entities['1'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('replace success not existing in list', (t) => {
  const { replaceSuccess } = createMutations({
    only: ['REPLACE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        name: 'Bob'
      }
    }
  };

  const data = { id: 2, name: 'John' };

  replaceSuccess(initialState, { data });

  t.is(initialState.isReplacing, false);

  t.is(initialState.replaceError, null);

  t.is(initialState.entities['2'], data);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('replace error', (t) => {
  const { replaceError } = createMutations({
    only: ['REPLACE'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  replaceError(initialState, error);

  t.is(initialState.isReplacing, false);

  t.is(initialState.replaceError, error);

  t.deepEqual(initialState.list, initialState.list);
  t.deepEqual(initialState.entities, initialState.entities);
});

// DESTROY

test('add mutations for destroy', (t) => {
  const mutations = createMutations({
    only: ['DESTROY']
  });

  t.falsy(mutations.fetchListStart);
  t.falsy(mutations.fetchListSuccess);
  t.falsy(mutations.fetchListError);

  t.falsy(mutations.fetchSingleStart);
  t.falsy(mutations.fetchSingleSuccess);
  t.falsy(mutations.fetchSingleError);

  t.falsy(mutations.createStart);
  t.falsy(mutations.createSuccess);
  t.falsy(mutations.createError);

  t.falsy(mutations.updateStart);
  t.falsy(mutations.updateSuccess);
  t.falsy(mutations.updateError);

  t.falsy(mutations.replaceStart);
  t.falsy(mutations.replaceSuccess);
  t.falsy(mutations.replaceError);

  t.truthy(mutations.destroyStart);
  t.truthy(mutations.destroySuccess);
  t.truthy(mutations.destroyError);
});

test('destroy start', (t) => {
  const { destroyStart } = createMutations({
    only: ['DESTROY'],
    idAttribute: 'id'
  });

  const initialState = {
    list: [],
    entities: {}
  };

  destroyStart(initialState);

  t.is(initialState.isDestroying, true);
});

test('destroy success existing in list', (t) => {
  const { destroySuccess } = createMutations({
    only: ['DESTROY'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        id: 1,
        name: 'Bob'
      },

      5: {
        id: 5,
        name: 'John'
      },

      6: {
        id: 6,
        name: 'Jane'
      }
    }
  };

  const id = 1;

  destroySuccess(initialState, id);

  t.is(initialState.isDestroying, false);

  t.is(initialState.destroyError, null);

  t.falsy(initialState.entities['1']);

  t.deepEqual(initialState.list, ['5', '6']);
});

test('destroy success not existing in list', (t) => {
  const { destroySuccess } = createMutations({
    only: ['DESTROY'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {
      1: {
        name: 'Bob'
      }
    }
  };

  const id = 2;

  destroySuccess(initialState, id);

  t.is(initialState.isDestroying, false);

  t.is(initialState.destroyError, null);

  t.falsy(initialState.entities['2']);

  t.deepEqual(initialState.list, ['1', '5', '6']);
});

test('destroy error', (t) => {
  const { destroyError } = createMutations({
    only: ['DESTROY'],
    idAttribute: 'id'
  });

  const initialState = {
    list: ['1', '5', '6'],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  destroyError(initialState, error);

  t.is(initialState.isDestroying, false);

  t.is(initialState.destroyError, error);

  t.deepEqual(initialState.list, initialState.list);
  t.deepEqual(initialState.entities, initialState.entities);
});
