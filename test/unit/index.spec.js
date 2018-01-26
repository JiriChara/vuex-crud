import test from 'ava';
import sinon from 'sinon';

import createCrud, { client } from '../../src';
import * as createStateObj from '../../src/vuex-crud/createState';
import * as createActionsObj from '../../src/vuex-crud/createActions';
import * as createMutationsObj from '../../src/vuex-crud/createMutations';
import * as createGettersObj from '../../src/vuex-crud/createGetters';
import clientImpl from '../../src/vuex-crud/client';

const createState = createStateObj.default;
const createActions = createActionsObj.default;
const createMutations = createMutationsObj.default;
const createGetters = createGettersObj.default;

test('creates namespaced module', (t) => {
  t.true(createCrud({ resource: 'articles' }).namespaced);
});

test('exports client', (t) => {
  t.is(client, clientImpl);
});

test('throws an error if resource name not specified', (t) => {
  const error = t.throws(() => createCrud(), Error);

  t.is(error.message, 'Resource name must be specified');
});

test('creates state', (t) => {
  t.deepEqual(
    createCrud({ resource: 'articles' }).state,
    createState({
      state: {},
      only: ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY']
    })
  );
});

test('creates state with given options', (t) => {
  t.deepEqual(
    createCrud({ resource: 'articles', only: ['CREATE'], state: { foo: 'bar' } }).state,
    createState({ only: ['CREATE'], state: { foo: 'bar' } })
  );
});

test('calls createState with correct arguments', (t) => {
  const spy = sinon.spy(createStateObj, 'default');
  const resource = 'foo';
  const only = ['CREATE'];
  const state = { foo: 'bar' };

  const crud = createCrud({ resource, only, state }).state;

  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.state, state);
  t.is(arg.only, only);

  createStateObj.default.restore();
});

test('creates actions', (t) => {
  const crudActions = createCrud({ resource: 'articles' }).actions;
  const actions = createActions({
    actions: {},
    urlRoot: '/api/articles',
    only: ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY'],
    clientImpl
  });

  t.is(crudActions.fetchList.toString(), actions.fetchList.toString());
  t.is(crudActions.fetchSingle.toString(), actions.fetchSingle.toString());
  t.is(crudActions.create.toString(), actions.create.toString());
  t.is(crudActions.update.toString(), actions.update.toString());
  t.is(crudActions.replace.toString(), actions.replace.toString());
  t.is(crudActions.destroy.toString(), actions.destroy.toString());

  t.is(JSON.stringify(crudActions), JSON.stringify(actions));
});

test('creates actions with given options', (t) => {
  const customAction = () => null;
  const customClient = () => null;

  const crudActions = createCrud({
    resource: 'articles',
    actions: {
      customAction
    },
    rootUrl: '/articles',
    only: ['FETCH_LIST'],
    client: customClient
  }).actions;

  const actions = createActions({
    actions: {
      customAction
    },
    urlRoot: '/articles',
    only: ['FETCH_LIST'],
    customClient
  });

  t.is(crudActions.fetchList.toString(), actions.fetchList.toString());
  t.falsy(crudActions.fetchSingle);
  t.falsy(crudActions.create);
  t.falsy(crudActions.update);
  t.falsy(crudActions.replace);
  t.falsy(crudActions.destroy);

  t.is(JSON.stringify(crudActions), JSON.stringify(actions));
});

test('calls createActions with correct arguments', (t) => {
  const spy = sinon.spy(createActionsObj, 'default');

  const actions = {};
  const customClient = () => null;
  const only = ['FETCH_LIST'];
  const parseList = res => res;
  const parseSingle = res => res;
  const parseError = err => err;

  const crud = createCrud({
    resource: 'articles',
    actions,
    urlRoot: '/articles',
    only,
    client: customClient,
    parseList,
    parseSingle,
    parseError
  }).actions;

  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.actions, actions);
  t.is(arg.rootUrl, '/articles');
  t.is(arg.only, only);
  t.is(arg.client, customClient);

  createActionsObj.default.restore();
});

test('calls createActions with correct arguments when customUrlFn provided', (t) => {
  const spy = sinon.spy(createActionsObj, 'default');

  const actions = {};
  const customClient = () => null;
  const only = ['FETCH_LIST'];
  const parseList = res => res;
  const parseSingle = res => res;
  const parseError = err => err;
  const customUrlFn = id => (
    id ? '/api/foo' : `/api/foo/${id}`
  );

  const crud = createCrud({
    resource: 'articles',
    actions,
    urlRoot: '/articles',
    customUrlFn,
    only,
    client: customClient,
    parseList,
    parseSingle,
    parseError
  }).actions;

  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.actions, actions);
  t.is(arg.rootUrl, customUrlFn);
  t.is(arg.only, only);
  t.is(arg.client, customClient);

  createActionsObj.default.restore();
});

test('removes trailing slash from url', (t) => {
  const spy = sinon.spy(createActionsObj, 'default');

  const crud = createCrud({
    resource: 'articles',
    urlRoot: '/articles/'
  }).actions;

  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.rootUrl, '/articles');

  createActionsObj.default.restore();
});

test('creates mutations', (t) => {
  const crudMutations = createCrud({ resource: 'articles' }).mutations;
  const mutations = createMutations({
    mutations: {},
    idAttribute: 'id',
    only: ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY'],
    onFetchListStart() {},
    onFetchListSuccess() {},
    onFetchListError() {},
    onFetchSingleStart() {},
    onFetchSingleSuccess() {},
    onFetchSingleError() {},
    onCreateStart() {},
    onCreateSuccess() {},
    onCreateError() {},
    onUpdateStart() {},
    onUpdateSuccess() {},
    onUpdateError() {},
    onReplaceStart() {},
    onReplaceSuccess() {},
    onReplaceError() {},
    onDestroyStart() {},
    onDestroySuccess() {},
    onDestroyError() {}
  });

  t.is(crudMutations.fetchListStart.toString(), mutations.fetchListStart.toString());
  t.is(crudMutations.fetchListSuccess.toString(), mutations.fetchListSuccess.toString());
  t.is(crudMutations.fetchListError.toString(), mutations.fetchListError.toString());

  t.is(crudMutations.fetchSingleStart.toString(), mutations.fetchSingleStart.toString());
  t.is(crudMutations.fetchSingleSuccess.toString(), mutations.fetchSingleSuccess.toString());
  t.is(crudMutations.fetchSingleError.toString(), mutations.fetchSingleError.toString());

  t.is(crudMutations.createStart.toString(), mutations.createStart.toString());
  t.is(crudMutations.createSuccess.toString(), mutations.createSuccess.toString());
  t.is(crudMutations.createError.toString(), mutations.createError.toString());

  t.is(crudMutations.updateStart.toString(), mutations.updateStart.toString());
  t.is(crudMutations.updateSuccess.toString(), mutations.updateSuccess.toString());
  t.is(crudMutations.updateError.toString(), mutations.updateError.toString());

  t.is(crudMutations.replaceStart.toString(), mutations.replaceStart.toString());
  t.is(crudMutations.replaceSuccess.toString(), mutations.replaceSuccess.toString());
  t.is(crudMutations.replaceError.toString(), mutations.replaceError.toString());

  t.is(crudMutations.destroyStart.toString(), mutations.destroyStart.toString());
  t.is(crudMutations.destroySuccess.toString(), mutations.destroySuccess.toString());
  t.is(crudMutations.destroyError.toString(), mutations.destroyError.toString());

  t.is(JSON.stringify(crudMutations), JSON.stringify(mutations));
});

test('creates mutations with given options', (t) => {
  const customMutations = {
    foo() {}
  };

  const crudMutations = createCrud({
    resource: 'articles',
    mutations: customMutations,
    idAttribute: 'slug',
    only: ['CREATE']
  }).mutations;

  const mutations = createMutations({
    mutations: customMutations,
    idAttribute: 'slug',
    only: ['CREATE'],
    onFetchListStart() {},
    onFetchListSuccess() {},
    onFetchListError() {},
    onFetchSingleStart() {},
    onFetchSingleSuccess() {},
    onFetchSingleError() {},
    onCreateStart() {},
    onCreateSuccess() {},
    onCreateError() {},
    onUpdateStart() {},
    onUpdateSuccess() {},
    onUpdateError() {},
    onReplaceStart() {},
    onReplaceSuccess() {},
    onReplaceError() {},
    onDestroyStart() {},
    onDestroySuccess() {},
    onDestroyError() {}
  });

  t.truthy(customMutations.foo);

  t.falsy(crudMutations.fetchListStart);
  t.falsy(crudMutations.fetchListSuccess);
  t.falsy(crudMutations.fetchListError);

  t.falsy(crudMutations.fetchSingleStart);
  t.falsy(crudMutations.fetchSingleSuccess);
  t.falsy(crudMutations.fetchSingleError);

  t.is(crudMutations.createStart.toString(), mutations.createStart.toString());
  t.is(crudMutations.createSuccess.toString(), mutations.createSuccess.toString());
  t.is(crudMutations.createError.toString(), mutations.createError.toString());

  t.falsy(crudMutations.updateStart);
  t.falsy(crudMutations.updateSuccess);
  t.falsy(crudMutations.updateError);

  t.falsy(crudMutations.replaceStart);
  t.falsy(crudMutations.replaceSuccess);
  t.falsy(crudMutations.replaceError);

  t.falsy(crudMutations.destroyStart);
  t.falsy(crudMutations.destroySuccess);
  t.falsy(crudMutations.destroyError);

  t.is(JSON.stringify(crudMutations), JSON.stringify(mutations));
});

test('calls createMutations with correct arguments', (t) => {
  const spy = sinon.spy(createMutationsObj, 'default');

  const onFetchListStart = () => {};
  const onFetchListSuccess = () => {};
  const onFetchListError = () => {};
  const onFetchSingleStart = () => {};
  const onFetchSingleSuccess = () => {};
  const onFetchSingleError = () => {};
  const onCreateStart = () => {};
  const onCreateSuccess = () => {};
  const onCreateError = () => {};
  const onUpdateStart = () => {};
  const onUpdateSuccess = () => {};
  const onUpdateError = () => {};
  const onReplaceStart = () => {};
  const onReplaceSuccess = () => {};
  const onReplaceError = () => {};
  const onDestroyStart = () => {};
  const onDestroySuccess = () => {};
  const onDestroyError = () => {};

  const customMutations = {
    foo() {}
  };

  const only = ['CREATE'];

  const crud = createCrud({
    resource: 'articles',
    mutations: customMutations,
    idAttribute: 'slug',
    only,
    onFetchListStart,
    onFetchListSuccess,
    onFetchListError,
    onFetchSingleStart,
    onFetchSingleSuccess,
    onFetchSingleError,
    onCreateStart,
    onCreateSuccess,
    onCreateError,
    onUpdateStart,
    onUpdateSuccess,
    onUpdateError,
    onReplaceStart,
    onReplaceSuccess,
    onReplaceError,
    onDestroyStart,
    onDestroySuccess,
    onDestroyError
  });

  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.mutations, customMutations);
  t.is(arg.only, only);
  t.is(arg.idAttribute, 'slug');
  t.is(arg.onFetchListStart, onFetchListStart);
  t.is(arg.onFetchListSuccess, onFetchListSuccess);
  t.is(arg.onFetchListError, onFetchListError);
  t.is(arg.onFetchSingleStart, onFetchSingleStart);
  t.is(arg.onFetchSingleSuccess, onFetchSingleSuccess);
  t.is(arg.onFetchSingleError, onFetchSingleError);
  t.is(arg.onCreateStart, onCreateStart);
  t.is(arg.onCreateSuccess, onCreateSuccess);
  t.is(arg.onCreateError, onCreateError);
  t.is(arg.onUpdateStart, onUpdateStart);
  t.is(arg.onUpdateSuccess, onUpdateSuccess);
  t.is(arg.onUpdateError, onUpdateError);
  t.is(arg.onReplaceStart, onReplaceStart);
  t.is(arg.onReplaceSuccess, onReplaceSuccess);
  t.is(arg.onReplaceError, onReplaceError);
  t.is(arg.onDestroyStart, onDestroyStart);
  t.is(arg.onDestroySuccess, onDestroySuccess);
  t.is(arg.onDestroyError, onDestroyError);

  createMutationsObj.default.restore();
});

test('creates getters', (t) => {
  const crudGetters = createCrud({ resource: 'articles' }).getters;

  const getters = createGetters({
    getters: {},
    idAttribute: 'id'
  });

  t.is(crudGetters.list.toString(), getters.list.toString());
  t.is(crudGetters.byId.toString(), getters.byId.toString());
  t.is(crudGetters.isLoading.toString(), getters.isLoading.toString());

  t.is(JSON.stringify(crudGetters), JSON.stringify(getters));
});

test('creates getters with given options', (t) => {
  const customGetters = {
    foo() {}
  };

  const crudGetters = createCrud({
    resource: 'articles',
    getters: customGetters,
    idAttribute: 'slug'
  }).getters;

  const getters = createGetters({
    getters: customGetters,
    idAttribute: 'slug'
  });

  t.is(crudGetters.list.toString(), getters.list.toString());
  t.is(crudGetters.byId.toString(), getters.byId.toString());
  t.is(crudGetters.isLoading.toString(), getters.isLoading.toString());
  t.is(crudGetters.foo, customGetters.foo);

  t.is(JSON.stringify(crudGetters), JSON.stringify(getters));
});

test('calls createGetters with correct arguments', (t) => {
  const spy = sinon.spy(createGettersObj, 'default');

  const customGetters = {
    foo() {}
  };

  const crud = createCrud({
    resource: 'articles',
    getters: customGetters,
    idAttribute: 'slug'
  }).getters;


  const arg = spy.getCalls(0)[0].args[0];

  t.truthy(crud); // eslint
  t.truthy(spy.called);

  t.is(arg.getters, customGetters);

  createGettersObj.default.restore();
});
