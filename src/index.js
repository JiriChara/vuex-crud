import defaultClient from './vuex-crud/client';
import createActions from './vuex-crud/createActions';
import createGetters from './vuex-crud/createGetters';
import createMutations from './vuex-crud/createMutations';
import createState from './vuex-crud/createState';

const createCrud = ({
  idAttribute = 'id',
  resource,
  urlRoot,
  state = {},
  actions = {},
  mutations = {},
  getters = {},
  client = defaultClient,
  only = ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY']
} = {}) => {
  if (!resource) {
    throw new Error('Resource name must be specified');
  }

  const rootUrl = urlRoot ? ((url) => {
    const lastCharacter = url(-1);

    return lastCharacter === '/' ? url.slice(0, -1) : url;
  })(urlRoot) : `/api/${resource}`;

  return {
    namespaced: true,

    state: createState({ state, only }),

    actions: createActions({ actions, rootUrl, resourceName: resource, only, client }),

    mutations: createMutations({ mutations, idAttribute, only }),

    getters: createGetters({ getters, idAttribute })
  };
};

export default createCrud;
