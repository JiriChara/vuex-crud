import test from 'ava';

import createCrud from '../../src';
import createState from '../../src/vuex-crud/createState';

test('creates namespaced module', (t) => {
  t.true(createCrud({ resource: 'articles' }).namespaced);
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
