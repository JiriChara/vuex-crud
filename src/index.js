import createActions from './vuex-crud/createActions';
import createGetters from './vuex-crud/createGetters';
import createMutations from './vuex-crud/createMutations';
import createState from './vuex-crud/createState';

const createCrud = ({
  idAttribute = 'id',
  resource,
  urlRoot,
  namespaced = true,
  state = {},
  actions = {},
  mutations = {},
  getters = {},
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
    namespaced,

    state: createState({ state }),

    actions: createActions({ actions, rootUrl, resourceName: resource, only }),

    mutations: createMutations({ mutations, idAttribute, only }),

    getters: createGetters({ getters, idAttribute })
  };
};

export default createCrud;
