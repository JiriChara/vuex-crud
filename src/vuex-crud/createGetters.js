/**
 * Create default getters and merge them with getters defined by a user.
 */
const createGetters = ({ getters, idAttribute }) => Object.assign({}, {
  /**
   * Return array of resources.
   */
  list(state) {
    return state.list.sort().map(id => state.entities[id.toString()]);
  },

  /**
   * Get resource by id.
   */
  byId(state, moduleGetters) {
    return id => moduleGetters.list.find(m => m[idAttribute].toString() === id.toString());
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
