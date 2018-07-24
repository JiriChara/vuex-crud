/**
 * Create default getters and merge them with getters defined by a user.
 */
const createGetters = ({ getters } = {}) => Object.assign({}, {
  /**
   * Return array of resources.
   */
  list(state) {
    return state.list.map(id => state.entities[id.toString()]);
  },

  /**
   * Get resource by id.
   */
  byId(state) {
    return id => state.entities[id.toString()];
  },

  /**
   * Return true if there is a logged error.
   */
  isError(state) {
    return state.fetchListError !== null ||
      state.fetchSingleError !== null ||
      state.createError !== null ||
      state.updateError !== null ||
      state.replaceError !== null ||
      state.destroyError !== null;
  },

  /**
   * Return true if there is a ongoing request.
   */
  isLoading(state) {
    return state.isFetchingList ||
      state.isFetchingSingle ||
      state.isCreating ||
      state.isUpdating ||
      state.isReplacing ||
      state.isDestroying;
  }
}, getters);

export default createGetters;
