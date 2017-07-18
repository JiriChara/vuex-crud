import test from 'ava';
import sinon from 'sinon';

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
  const onFetchListStart = sinon.spy();

  const fetchListStart = createMutations({
    only: ['FETCH_LIST'],
    onFetchListStart,
    idAttribute: 'id'
  }).fetchListStart;

  const initialState = {
    list: [],
    entities: {}
  };

  fetchListStart(initialState);

  t.is(initialState.isFetchingList, true);
});

test('fetch list start calls onFetchListStart', (t) => {
  const onFetchListStart = sinon.spy();

  const fetchListStart = createMutations({
    only: ['FETCH_LIST'],
    onFetchListStart,
    idAttribute: 'id'
  }).fetchListStart;

  const initialState = {
    list: [],
    entities: {}
  };

  fetchListStart(initialState);

  t.true(onFetchListStart.calledWith(initialState));
});

test('fetch list success', (t) => {
  const onFetchListSuccess = sinon.spy();

  const fetchListSuccess = createMutations({
    only: ['FETCH_LIST'],
    onFetchListSuccess,
    idAttribute: 'id'
  }).fetchListSuccess;

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

test('fetch list success calls onFetchListSuccess', (t) => {
  const onFetchListSuccess = sinon.spy();

  const fetchListSuccess = createMutations({
    only: ['FETCH_LIST'],
    onFetchListSuccess,
    idAttribute: 'id'
  }).fetchListSuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const data = [
    { id: 1 },
    { id: 2 }
  ];

  fetchListSuccess(initialState, { data });

  t.true(onFetchListSuccess.calledWith(initialState));
});

test('fetch list error', (t) => {
  const onFetchListError = sinon.spy();

  const fetchListError = createMutations({
    only: ['FETCH_LIST'],
    onFetchListError,
    idAttribute: 'id'
  }).fetchListError;

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

test('fetch list error calls onFetchListError', (t) => {
  const onFetchListError = sinon.spy();

  const fetchListError = createMutations({
    only: ['FETCH_LIST'],
    onFetchListError,
    idAttribute: 'id'
  }).fetchListError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  fetchListError(initialState, error);

  t.true(onFetchListError.calledWith(initialState, error));
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
  const onFetchSingleStart = sinon.spy();

  const fetchSingleStart = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleStart,
    idAttribute: 'id'
  }).fetchSingleStart;

  const initialState = {
    list: [],
    entities: {}
  };

  fetchSingleStart(initialState);

  t.is(initialState.isFetchingSingle, true);
});

test('fetch single start calls onFetchSingleStart', (t) => {
  const onFetchSingleStart = sinon.spy();

  const fetchSingleStart = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleStart,
    idAttribute: 'id'
  }).fetchSingleStart;

  const initialState = {
    list: [],
    entities: {}
  };

  fetchSingleStart(initialState);

  t.true(onFetchSingleStart.calledWith(initialState));
});

test('fetch single success', (t) => {
  const onFetchSingleSuccess = sinon.spy();

  const fetchSingleSuccess = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleSuccess,
    idAttribute: 'id'
  }).fetchSingleSuccess;

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

test('fetch single success calls onFetchSingleSuccess', (t) => {
  const onFetchSingleSuccess = sinon.spy();

  const fetchSingleSuccess = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleSuccess,
    idAttribute: 'id'
  }).fetchSingleSuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const data = { id: 1 };

  fetchSingleSuccess(initialState, { data });

  t.true(onFetchSingleSuccess.calledWith(initialState, { data }));
});

test('fetch single error', (t) => {
  const onFetchSingleError = sinon.spy();

  const fetchSingleError = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleError,
    idAttribute: 'id'
  }).fetchSingleError;

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

test('fetch single error calls onFetchSingleError', (t) => {
  const onFetchSingleError = sinon.spy();

  const fetchSingleError = createMutations({
    only: ['FETCH_SINGLE'],
    onFetchSingleError,
    idAttribute: 'id'
  }).fetchSingleError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  fetchSingleError(initialState, error);

  t.true(onFetchSingleError.calledWith(initialState, error));
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
  const onCreateStart = sinon.spy();

  const createStart = createMutations({
    only: ['CREATE'],
    onCreateStart,
    idAttribute: 'id'
  }).createStart;

  const initialState = {
    list: [],
    entities: {}
  };

  createStart(initialState);

  t.is(initialState.isCreating, true);
});

test('create start calls onCreateStart', (t) => {
  const onCreateStart = sinon.spy();

  const createStart = createMutations({
    only: ['CREATE'],
    onCreateStart,
    idAttribute: 'id'
  }).createStart;

  const initialState = {
    list: [],
    entities: {}
  };

  createStart(initialState);

  t.true(onCreateStart.calledWith(initialState));
});

test('create success', (t) => {
  const onCreateSuccess = sinon.spy();

  const createSuccess = createMutations({
    only: ['CREATE'],
    onCreateSuccess,
    idAttribute: 'id'
  }).createSuccess;

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

test('create success calls onCreateSuccess', (t) => {
  const onCreateSuccess = sinon.spy();

  const createSuccess = createMutations({
    only: ['CREATE'],
    onCreateSuccess,
    idAttribute: 'id'
  }).createSuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const data = { id: 1 };

  createSuccess(initialState, { data });

  t.true(onCreateSuccess.calledWith(initialState, { data }));
});

test('create error', (t) => {
  const onCreateError = sinon.spy();

  const createError = createMutations({
    only: ['CREATE'],
    onCreateError,
    idAttribute: 'id'
  }).createError;

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

test('create error calls onCreateError', (t) => {
  const onCreateError = sinon.spy();

  const createError = createMutations({
    only: ['CREATE'],
    onCreateError,
    idAttribute: 'id'
  }).createError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  createError(initialState, error);

  t.true(onCreateError.calledWith(initialState, error));
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
  const onUpdateStart = sinon.spy();

  const updateStart = createMutations({
    only: ['UPDATE'],
    onUpdateStart,
    idAttribute: 'id'
  }).updateStart;

  const initialState = {
    list: [],
    entities: {}
  };

  updateStart(initialState);

  t.is(initialState.isUpdating, true);
});

test('update start calls onUpdateStart', (t) => {
  const onUpdateStart = sinon.spy();

  const updateStart = createMutations({
    only: ['UPDATE'],
    onUpdateStart,
    idAttribute: 'id'
  }).updateStart;

  const initialState = {
    list: [],
    entities: {}
  };

  updateStart(initialState);

  t.true(onUpdateStart.calledWith(initialState));
});

test('update success existing in list', (t) => {
  const onUpdateSuccess = sinon.spy();

  const updateSuccess = createMutations({
    only: ['UPDATE'],
    onUpdateSuccess,
    idAttribute: 'id'
  }).updateSuccess;

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
  const onUpdateSuccess = sinon.spy();

  const updateSuccess = createMutations({
    only: ['UPDATE'],
    onUpdateSuccess,
    idAttribute: 'id'
  }).updateSuccess;

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

test('update success calls onUpdateSuccess', (t) => {
  const onUpdateSuccess = sinon.spy();

  const updateSuccess = createMutations({
    only: ['UPDATE'],
    onUpdateSuccess,
    idAttribute: 'id'
  }).updateSuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const data = { id: 1, name: 'Bob' };

  updateSuccess(initialState, { data });

  t.true(onUpdateSuccess.calledWith(initialState, { data }));
});

test('update error', (t) => {
  const onUpdateError = sinon.spy();

  const updateError = createMutations({
    only: ['UPDATE'],
    onUpdateError,
    idAttribute: 'id'
  }).updateError;

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

test('update error calls onUpdateError', (t) => {
  const onUpdateError = sinon.spy();

  const updateError = createMutations({
    only: ['UPDATE'],
    onUpdateError,
    idAttribute: 'id'
  }).updateError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  updateError(initialState, error);

  t.true(onUpdateError.calledWith(initialState, error));
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
  const onReplaceStart = sinon.spy();

  const replaceStart = createMutations({
    only: ['REPLACE'],
    onReplaceStart,
    idAttribute: 'id'
  }).replaceStart;

  const initialState = {
    list: [],
    entities: {}
  };

  replaceStart(initialState);

  t.is(initialState.isReplacing, true);
});

test('replace start calls onReplaceStart', (t) => {
  const onReplaceStart = sinon.spy();

  const replaceStart = createMutations({
    only: ['REPLACE'],
    onReplaceStart,
    idAttribute: 'id'
  }).replaceStart;

  const initialState = {
    list: [],
    entities: {}
  };

  replaceStart(initialState);

  t.true(onReplaceStart.calledWith(initialState));
});

test('replace success existing in list', (t) => {
  const onReplaceSuccess = sinon.spy();

  const replaceSuccess = createMutations({
    only: ['REPLACE'],
    onReplaceSuccess,
    idAttribute: 'id'
  }).replaceSuccess;

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
  const onReplaceSuccess = sinon.spy();

  const replaceSuccess = createMutations({
    only: ['REPLACE'],
    onReplaceSuccess,
    idAttribute: 'id'
  }).replaceSuccess;

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

test('replace success calls onReplaceSuccess', (t) => {
  const onReplaceSuccess = sinon.spy();

  const replaceSuccess = createMutations({
    only: ['REPLACE'],
    onReplaceSuccess,
    idAttribute: 'id'
  }).replaceSuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const data = { id: 1, name: 'Bob' };

  replaceSuccess(initialState, { data });

  t.true(onReplaceSuccess.calledWith(initialState, { data }));
});

test('replace error', (t) => {
  const onReplaceError = sinon.spy();

  const replaceError = createMutations({
    only: ['REPLACE'],
    onReplaceError,
    idAttribute: 'id'
  }).replaceError;

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

test('replace error calls onReplaceError', (t) => {
  const onReplaceError = sinon.spy();

  const replaceError = createMutations({
    only: ['REPLACE'],
    onReplaceError,
    idAttribute: 'id'
  }).replaceError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  replaceError(initialState, error);

  t.true(onReplaceError.calledWith(initialState, error));
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
  const onDestroyStart = sinon.spy();

  const destroyStart = createMutations({
    only: ['DESTROY'],
    onDestroyStart,
    idAttribute: 'id'
  }).destroyStart;

  const initialState = {
    list: [],
    entities: {}
  };

  destroyStart(initialState);

  t.is(initialState.isDestroying, true);
});

test('destroy start calls onDestroyStart', (t) => {
  const onDestroyStart = sinon.spy();

  const destroyStart = createMutations({
    only: ['DESTROY'],
    onDestroyStart,
    idAttribute: 'id'
  }).destroyStart;

  const initialState = {
    list: [],
    entities: {}
  };

  destroyStart(initialState);

  t.true(onDestroyStart.calledWith(initialState));
});

test('destroy success existing in list', (t) => {
  const onDestroySuccess = sinon.spy();

  const destroySuccess = createMutations({
    only: ['DESTROY'],
    onDestroySuccess,
    idAttribute: 'id'
  }).destroySuccess;

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
  const onDestroySuccess = sinon.spy();

  const destroySuccess = createMutations({
    only: ['DESTROY'],
    onDestroySuccess,
    idAttribute: 'id'
  }).destroySuccess;

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

test('destroy success calls onDestroySuccess', (t) => {
  const onDestroySuccess = sinon.spy();

  const destroySuccess = createMutations({
    only: ['DESTROY'],
    onDestroySuccess,
    idAttribute: 'id'
  }).destroySuccess;

  const initialState = {
    list: [],
    entities: {}
  };

  const id = 1;

  destroySuccess(initialState, id, { id });

  t.true(onDestroySuccess.calledWith(initialState, { id }));
});

test('destroy error', (t) => {
  const onDestroyError = sinon.spy();

  const destroyError = createMutations({
    only: ['DESTROY'],
    onDestroyError,
    idAttribute: 'id'
  }).destroyError;

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

test('destroy error calls onDestroyError', (t) => {
  const onDestroyError = sinon.spy();

  const destroyError = createMutations({
    only: ['DESTROY'],
    onDestroyError,
    idAttribute: 'id'
  }).destroyError;

  const initialState = {
    list: [],
    entities: {}
  };

  const error = { message: 'Something went wrong' };

  destroyError(initialState, error);

  t.true(onDestroyError.calledWith(initialState, error));
});
