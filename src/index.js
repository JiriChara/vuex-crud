import defaultClient from './vuex-crud/client';
import createActions from './vuex-crud/createActions';
import createGetters from './vuex-crud/createGetters';
import createMutations from './vuex-crud/createMutations';
import createState from './vuex-crud/createState';

/**
 * Creates new Vuex CRUD module.
 *
 * @param {Object} configuration
 * @property {String} idAttribute The name of ID attribute.
 * @property {String} resource The name of the resource.
 * @property {String} urlRoot The root url.
 * @property {Function} customUrlFn A custom getter for more complex URL to request data from API.
 * @property {Object} state The default state (will override generated state).
 * @property {Object} actions The default actions (will override generated actions object).
 * @property {Object} mutations The default mutations (will override generated mutations object).
 * @property {Object} getters The default getters (will override generated getters object).
 * @property {Object} client The client that should be used to do API requests.
 * @property {Function} onFetchListStart Mutation method called after collection fetch start.
 * @property {Function} onFetchListSuccess Mutation method called after collection fetch success.
 * @property {Function} onFetchListError Mutation method called after collection fetch error.
 * @property {Function} onFetchSingleStart Mutation method called after single fetch start.
 * @property {Function} onFetchSingleSuccess Mutation method called after single fetch success.
 * @property {Function} onFetchSingleError Mutation method called after single fetch error.
 * @property {Function} onCreateStart Mutation method called after create state.
 * @property {Function} onCreateSuccess Mutation method called after create success.
 * @property {Function} onCreateError Mutation method called after create error.
 * @property {Function} onUpdateStart Mutation method called after update state.
 * @property {Function} onUpdateSuccess Mutation method called after update success.
 * @property {Function} onUpdateError Mutation method called after update error.
 * @property {Function} onReplaceStart Mutation method called after replace state.
 * @property {Function} onReplaceSuccess Mutation method called after replace success.
 * @property {Function} onReplaceError Mutation method called after replace error.
 * @property {Function} onDestroyStart Mutation method called after destroy state.
 * @property {Function} onDestroySuccess Mutation method called after destroy success.
 * @property {Function} onDestroyError Mutation method called after destroy error.
 * @property {Array} only A list of CRUD actions that should be available.
 * @property {Function} parseList A method used to parse list of resources.
 * @property {Function} parseSingle A method used to parse singe resource.
 * @property {Function} parseError A method used to parse error responses.
 * @return {Object} A Vuex module.
 */
const createCrud = ({
  idAttribute = 'id',
  resource,
  urlRoot,
  customUrlFn = null,
  state = {},
  actions = {},
  mutations = {},
  getters = {},
  client = defaultClient,
  onFetchListStart = () => { },
  onFetchListSuccess = () => { },
  onFetchListError = () => { },
  onFetchSingleStart = () => { },
  onFetchSingleSuccess = () => { },
  onFetchSingleError = () => { },
  onCreateStart = () => { },
  onCreateSuccess = () => { },
  onCreateError = () => { },
  onUpdateStart = () => { },
  onUpdateSuccess = () => { },
  onUpdateError = () => { },
  onReplaceStart = () => { },
  onReplaceSuccess = () => { },
  onReplaceError = () => { },
  onDestroyStart = () => { },
  onDestroySuccess = () => { },
  onDestroyError = () => { },
  only = ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY'],
  parseList = res => res,
  parseSingle = res => res,
  parseError = res => res
} = {}) => {
  if (!resource) {
    throw new Error('Resource name must be specified');
  }

  let rootUrl;

  /**
   * Create root url for API requests. By default it is: /api/<resource>.
   * Use custom url getter if given.
   */
  if (typeof customUrlFn === 'function') {
    rootUrl = customUrlFn;
  } else if (typeof urlRoot === 'string') {
    rootUrl = ((url) => {
      const lastCharacter = url.substr(-1);

      return lastCharacter === '/' ? url.slice(0, -1) : url;
    })(urlRoot);
  } else {
    rootUrl = `/api/${resource}`;
  }

  return {
    namespaced: true,

    state: createState({ state, only }),

    actions: createActions({
      actions,
      rootUrl,
      only,
      client,
      parseList,
      parseSingle,
      parseError,
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
    }),

    mutations: createMutations({
      mutations,
      idAttribute,
      only
    }),

    getters: createGetters({ getters })
  };
};

export default createCrud;

/**
 * Export client in case user want's to add interceptors.
 */
export { defaultClient as client };
