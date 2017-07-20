/**
 * Create default getters and merge them with getters defined by a user.
 */
const createGetters = ({ getters, idAttribute } = {}) => Object.assign({}, {
  /**
   * Return array of resources.
   */
  list(state) {
    return state.list.map(id => state.entities[id.toString()]);
  },

  /**
   * Return array of singles (used internally by `byId` getter)
   */
  singles(state) {
    return state.singles.map(id => state.entities[id.toString()]);
  },

  /**
   * Get resource by id.
   */
  byId(state, mutationsGetters) {
    return id => mutationsGetters.singles.find((item) => {
      const itemId = item[idAttribute];

      return itemId && itemId.toString() === id.toString();
    }) || null;
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
