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
  const fetchList = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchList;

  const commit = sinon.spy();

  fetchList({ commit });

  t.true(commit.calledWith('fetchListStart'));
});

test.cb('fetchList commits fetchListSuccess', (t) => {
  const fetchList = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchList;

  const commit = sinon.spy();

  t.plan(2);

  fetchList({ commit }).then(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'fetchListSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('fetchList commits fetchListError', (t) => {
  client.isSuccessful = false;

  const fetchList = createActions({
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchList;

  const commit = sinon.spy();

  t.plan(2);

  fetchList({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'fetchListError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls get with correct arguments', (t) => {
  const fetchList = createActions({
    rootUrl: '/articles',
    only: ['FETCH_LIST'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchList;

  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchList({ commit }, { config });

  t.true(spy.calledWith('/articles', config));

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
  const fetchSingle = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchSingle;

  const commit = sinon.spy();

  fetchSingle({ commit });

  t.true(commit.calledWith('fetchSingleStart'));
});

test.cb('fetchSingle commits fetchSingleSuccess', (t) => {
  const fetchSingle = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchSingle;

  const commit = sinon.spy();

  t.plan(2);

  fetchSingle({ commit }).then(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'fetchSingleSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('fetchSingle commits fetchSingleError', (t) => {
  client.isSuccessful = false;

  const fetchSingle = createActions({
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchSingle;

  const commit = sinon.spy();

  t.plan(2);

  fetchSingle({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'fetchSingleError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls get with correct arguments', (t) => {
  const fetchSingle = createActions({
    rootUrl: '/articles',
    only: ['FETCH_SINGLE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).fetchSingle;

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'get');

  fetchSingle({ commit }, { id, config });

  t.true(spy.calledWith(`/articles/${id}`, config));

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
  const create = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).create;

  const commit = sinon.spy();

  create({ commit });

  t.true(commit.calledWith('createStart'));
});

test.cb('create commits createSuccess', (t) => {
  const create = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).create;

  const commit = sinon.spy();

  t.plan(2);

  create({ commit }).then(() => {
    const args = commit.getCalls()[1].args;


    t.is(args[0], 'createSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('create commits createError', (t) => {
  client.isSuccessful = false;

  const create = createActions({
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).create;

  const commit = sinon.spy();

  t.plan(2);

  create({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'createError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls post with correct arguments', (t) => {
  const create = createActions({
    rootUrl: '/articles',
    only: ['CREATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).create;

  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'post');

  create({ commit }, { data, config });

  t.true(spy.calledWith('/articles', data, config));

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
  const update = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).update;

  const commit = sinon.spy();

  update({ commit });

  t.true(commit.calledWith('updateStart'));
});

test.cb('update commits updateSuccess', (t) => {
  const update = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).update;

  const commit = sinon.spy();

  t.plan(2);

  update({ commit }).then(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'updateSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('update commits updateError', (t) => {
  client.isSuccessful = false;

  const update = createActions({
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).update;

  const commit = sinon.spy();

  t.plan(2);

  update({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'updateError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls patch with correct arguments', (t) => {
  const create = createActions({
    rootUrl: '/articles',
    only: ['UPDATE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).update;

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'patch');

  create({ commit }, { id, data, config });

  t.true(spy.calledWith(`/articles/${id}`, data, config));

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
  const replace = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).replace;

  const commit = sinon.spy();

  replace({ commit });

  t.true(commit.calledWith('replaceStart'));
});

test.cb('replace commits replaceSuccess', (t) => {
  const replace = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).replace;

  const commit = sinon.spy();

  t.plan(2);

  replace({ commit }).then(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'replaceSuccess');
    t.deepEqual(args[1], client.successResponse);

    t.end();
  });
});

test.cb('replace commits replaceError', (t) => {
  client.isSuccessful = false;

  const replace = createActions({
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).replace;

  const commit = sinon.spy();

  t.plan(2);

  replace({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'replaceError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls put with correct arguments', (t) => {
  const create = createActions({
    rootUrl: '/articles',
    only: ['REPLACE'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).replace;

  const id = 123;
  const data = { some: 'data' };
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'put');

  create({ commit }, { id, data, config });

  t.true(spy.calledWith(`/articles/${id}`, data, config));

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
  const destroy = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).destroy;

  const commit = sinon.spy();

  destroy({ commit });

  t.true(commit.calledWith('destroyStart'));
});

test.cb('destroy commits destroySuccess', (t) => {
  const destroy = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).destroy;

  const commit = sinon.spy();
  const id = 1;

  t.plan(3);

  destroy({ commit }, { id }).then(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'destroySuccess');
    t.deepEqual(args[1], id);
    t.deepEqual(args[2], client.successResponse);

    t.end();
  });
});

test.cb('destroy commits destroyError', (t) => {
  client.isSuccessful = false;

  const destroy = createActions({
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).destroy;

  const commit = sinon.spy();

  t.plan(2);

  destroy({ commit }).catch(() => {
    const args = commit.getCalls()[1].args;

    t.is(args[0], 'destroyError');
    t.deepEqual(args[1], client.errorResponse);

    t.end();
  });
});

test('calls delete with correct arguments', (t) => {
  const create = createActions({
    rootUrl: '/articles',
    only: ['DESTROY'],
    client,
    parseList: res => res,
    parseSingle: res => res,
    parseError: res => res
  }).destroy;

  const id = 123;
  const config = { foo: 'bar' };

  const commit = sinon.spy();
  const spy = sinon.spy(client, 'delete');

  create({ commit }, { id, config });

  t.true(spy.calledWith(`/articles/${id}`, config));

  client.delete.restore();
});
