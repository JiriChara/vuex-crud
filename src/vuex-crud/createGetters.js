const createGetters = ({ getters, idAttribute }) => Object.assign({}, {
  list(state) {
    return state.list.sort().map(id => state.entities[id.toString()]);
  },

  byId(state, moduleGetters) {
    return id => moduleGetters.list.find(m => m[idAttribute].toString() === id.toString());
  }
}, getters);

export default createGetters;
