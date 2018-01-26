import test from 'ava';
import sinon from 'sinon';

import client from '../fakeClient';
import createActions from '../../../src/vuex-crud/createActions';

test.beforeEach(() => {
  client.successResponse = {};
  client.errorResponse = {};
  client.isSuccessful = true;
});

// Fetch List

test('creates actions with fetchList method', (t) => {
  const actions = createActions({
    only: ['FETCH_LIST'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.fetchList);

  t.falsy(actions.fetchSingle);
  t.falsy(actions.create);
  t.falsy(actions.update);
  t.falsy(actions.replace);
  t.falsy(actions.destroy);
});

test('fetchList commits fetchListStart', (t) => {
  const { fetchList } = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  fetchList({ commit });

  t.true(commit.calledWith('fetchListStart'));
});

test.cb('fetchList commits fetchListSuccess', (t) => {
  const { fetchList } = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  fetchList({ commit }).then(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'fetchListSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('fetchList commits fetchListError', (t) => {
  client.isSuccessful = false;

  const { fetchList } = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  fetchList({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'fetchListError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls get with correct arguments', (t) => {
  const { fetchList } = createActions({
    rootUrl: '/articles',
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchList({ commit }, { config });

  t.true(spy.calledWith('/articles', config));

  client.get.restore();
});

test('fetch list supports customUrl', (t) => {
  const { fetchList } = createActions({
    rootUrl: '/articles',
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchList({ commit }, { config, customUrl: '/custom-articles' });

  t.true(spy.calledWith('/custom-articles', config));

  client.get.restore();
});

test('fetch list supports customUrlFnArgs', (t) => {
  const { fetchList } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles`; },
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchList({ commit }, { config, customUrlFnArgs: '123' });

  t.true(spy.calledWith('/users/123/articles', config));

  client.get.restore();
});

test('fetch list supports customUrlFnArgs as array', (t) => {
  const { fetchList } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles`; },
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchList({ commit }, { config, customUrlFnArgs: ['123'] });

  t.true(spy.calledWith('/users/123/articles', config));

  client.get.restore();
});

// Fetch Single

test('creates actions with fetchSingle method', (t) => {
  const actions = createActions({
    only: ['FETCH_SINGLE'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.fetchSingle);

  t.falsy(actions.fetchList);
  t.falsy(actions.create);
  t.falsy(actions.update);
  t.falsy(actions.replace);
  t.falsy(actions.destroy);
});

test('fetchSingle commits fetchSingleStart', (t) => {
  const { fetchSingle } = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  fetchSingle({ commit });

  t.true(commit.calledWith('fetchSingleStart'));
});

test.cb('fetchSingle commits fetchSingleSuccess', (t) => {
  const { fetchSingle } = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  fetchSingle({ commit }).then(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'fetchSingleSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('fetchSingle commits fetchSingleError', (t) => {
  client.isSuccessful = false;

  const { fetchSingle } = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  fetchSingle({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'fetchSingleError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls get with correct arguments', (t) => {
  const { fetchSingle } = createActions({
    rootUrl: '/articles',
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchSingle({ commit }, { id, config });

  t.true(spy.calledWith(`/articles/${id}`, config));

  client.get.restore();
});

test('fetch single supports customUrl', (t) => {
  const { fetchSingle } = createActions({
    rootUrl: '/articles',
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchSingle({ commit }, { config, customUrl: '/custom-articles/123' });

  t.true(spy.calledWith('/custom-articles/123', config));

  client.get.restore();
});

test('fetch single supports customUrlFnArgs', (t) => {
  const { fetchSingle } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchSingle({ commit }, { id, config, customUrlFnArgs: '456' });

  t.true(spy.calledWith('/users/456/articles/123', config));

  client.get.restore();
});

test('fetch single supports customUrlFnArgs as array', (t) => {
  const { fetchSingle } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchSingle({ commit }, { id, config, customUrlFnArgs: ['456'] });

  t.true(spy.calledWith('/users/456/articles/123', config));

  client.get.restore();
});

// Create

test('creates actions with create method', (t) => {
  const actions = createActions({
    only: ['CREATE'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.create);

  t.falsy(actions.fetchList);
  t.falsy(actions.fetchSingle);
  t.falsy(actions.update);
  t.falsy(actions.replace);
  t.falsy(actions.destroy);
});

test('create commits createStart', (t) => {
  const { create } = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  create({ commit });

  t.true(commit.calledWith('createStart'));
});

test.cb('create commits createSuccess', (t) => {
  const { create } = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  create({ commit }).then(() => {
    const { args } = commit.getCalls()[1];


    t.is(args[0], 'createSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('create commits createError', (t) => {
  client.isSuccessful = false;

  const { create } = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  create({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'createError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls post with correct arguments', (t) => {
  const { create } = createActions({
    rootUrl: '/articles',
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'post');

  create({ commit }, { data, config });

  t.true(spy.calledWith('/articles', data, config));

  client.post.restore();
});

test('create supports customUrl', (t) => {
  const { create } = createActions({
    rootUrl: '/articles',
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'post');

  create({ commit }, { data, config, customUrl: '/custom-articles' });

  t.true(spy.calledWith('/custom-articles', data, config));

  client.post.restore();
});

test('create supports customUrlFnArgs', (t) => {
  const { create } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles`; },
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'post');

  create({ commit }, { data, config, customUrlFnArgs: '123' });

  t.true(spy.calledWith('/users/123/articles', data, config));

  client.post.restore();
});

test('create supports customUrlFnArgs as array', (t) => {
  const { create } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles`; },
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'post');

  create({ commit }, { data, config, customUrlFnArgs: ['123'] });

  t.true(spy.calledWith('/users/123/articles', data, config));

  client.post.restore();
});

// Update

test('creates actions with update method', (t) => {
  const actions = createActions({
    only: ['UPDATE'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.update);

  t.falsy(actions.fetchList);
  t.falsy(actions.fetchSingle);
  t.falsy(actions.create);
  t.falsy(actions.replace);
  t.falsy(actions.destroy);
});

test('update commits updateStart', (t) => {
  const { update } = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  update({ commit });

  t.true(commit.calledWith('updateStart'));
});

test.cb('update commits updateSuccess', (t) => {
  const { update } = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  update({ commit }).then(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'updateSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('update commits updateError', (t) => {
  client.isSuccessful = false;

  const { update } = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  update({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'updateError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls patch with correct arguments', (t) => {
  const { update } = createActions({
    rootUrl: '/articles',
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'patch');

  update({ commit }, { id, data, config });

  t.true(spy.calledWith(`/articles/${id}`, data, config));

  client.patch.restore();
});

test('update supports customUrl', (t) => {
  const { update } = createActions({
    rootUrl: '/articles',
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'patch');

  update({ commit }, { data, config, customUrl: '/custom-articles/123' });

  t.true(spy.calledWith('/custom-articles/123', data, config));

  client.patch.restore();
});

test('update supports customUrlFnArgs', (t) => {
  const { update } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'patch');

  update({ commit }, {
    id,
    data,
    config,
    customUrlFnArgs: '456'
  });

  t.true(spy.calledWith('/users/456/articles/123', data, config));

  client.patch.restore();
});

test('update supports customUrlFnArgs as array', (t) => {
  const { update } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'patch');

  update({ commit }, {
    id,
    data,
    config,
    customUrlFnArgs: ['456']
  });

  t.true(spy.calledWith('/users/456/articles/123', data, config));

  client.patch.restore();
});

// Replace

test('creates actions with replace method', (t) => {
  const actions = createActions({
    only: ['REPLACE'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.replace);

  t.falsy(actions.fetchList);
  t.falsy(actions.fetchSingle);
  t.falsy(actions.create);
  t.falsy(actions.update);
  t.falsy(actions.destroy);
});

test('replace commits replaceStart', (t) => {
  const { replace } = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  replace({ commit });

  t.true(commit.calledWith('replaceStart'));
});

test.cb('replace commits replaceSuccess', (t) => {
  const { replace } = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  replace({ commit }).then(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'replaceSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('replace commits replaceError', (t) => {
  client.isSuccessful = false;

  const { replace } = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  replace({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'replaceError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls put with correct arguments', (t) => {
  const { replace } = createActions({
    rootUrl: '/articles',
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'put');

  replace({ commit }, { id, data, config });

  t.true(spy.calledWith(`/articles/${id}`, data, config));

  client.put.restore();
});

test('replace supports customUrl', (t) => {
  const { replace } = createActions({
    rootUrl: '/articles',
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'put');

  replace({ commit }, { data, config, customUrl: '/custom-articles/123' });

  t.true(spy.calledWith('/custom-articles/123', data, config));

  client.put.restore();
});

test('replace supports customUrlFnArgs', (t) => {
  const { replace } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'put');

  replace({ commit }, {
    id,
    data,
    config,
    customUrlFnArgs: '456'
  });

  t.true(spy.calledWith('/users/456/articles/123', data, config));

  client.put.restore();
});

test('replace supports customUrlFnArgs as array', (t) => {
  const { replace } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'put');

  replace({ commit }, {
    id,
    data,
    config,
    customUrlFnArgs: ['456']
  });

  t.true(spy.calledWith('/users/456/articles/123', data, config));

  client.put.restore();
});

// Destroy

test('creates actions with destroy method', (t) => {
  const actions = createActions({
    only: ['DESTROY'],
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  t.truthy(actions.destroy);

  t.falsy(actions.fetchList);
  t.falsy(actions.fetchSingle);
  t.falsy(actions.create);
  t.falsy(actions.update);
  t.falsy(actions.replace);
});

test('destroy commits destroyStart', (t) => {
  const { destroy } = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  destroy({ commit });

  t.true(commit.calledWith('destroyStart'));
});

test.cb('destroy commits destroySuccess', (t) => {
  const { destroy } = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();
  const id = 1;

  t.plan(3);

  destroy({ commit }, { id }).then(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'destroySuccess');
    t.deepEqual(args[1], id);
    t.deepEqual(args[2], client.successResponse);

    t.end();
  });
});

test.cb('destroy commits destroyError', (t) => {
  client.isSuccessful = false;

  const { destroy } = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const commit = sinon.spy();

  t.plan(2);

  destroy({ commit }).catch(() => {
    const { args } = commit.getCalls()[1];

    t.is(args[0], 'destroyError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls delete with correct arguments', (t) => {
  const { destroy } = createActions({
    rootUrl: '/articles',
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'delete');

  destroy({ commit }, { id, config });

  t.true(spy.calledWith(`/articles/${id}`, config));

  client.delete.restore();
});

test('destroy supports customUrl', (t) => {
  const { destroy } = createActions({
    rootUrl: '/articles',
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'delete');

  destroy({ commit }, { config, customUrl: '/custom-articles/123' });

  t.true(spy.calledWith('/custom-articles/123', config));

  client.delete.restore();
});

test('destroy supports customUrlFnArgs', (t) => {
  const { destroy } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'delete');

  destroy({ commit }, {
    id,
    config,
    customUrlFnArgs: '456'
  });

  t.true(spy.calledWith('/users/456/articles/123', config));

  client.delete.restore();
});

test('destroy supports customUrlFnArgs as array', (t) => {
  const { destroy } = createActions({
    rootUrl(id, parentId) { return `/users/${parentId}/articles/${id}`; },
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  });

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'delete');

  destroy({ commit }, {
    id,
    config,
    customUrlFnArgs: ['456']
  });

  t.true(spy.calledWith('/users/456/articles/123', config));

  client.delete.restore();
});
