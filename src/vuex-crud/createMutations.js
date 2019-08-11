import Vue from 'vue';

/**
 * Create default mutations and merge them with mutations defined by a user.
 */
const createMutations = ({
  mutations,
  only,
  idAttribute
}) => {
  const crudMutations = {};

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudMutations, {
      fetchListStart(state) {
        state.isFetchingList = true;
      },

      fetchListSuccess(state, response) {
        const { data } = response;

        data.forEach((m) => {
          Vue.set(state.entities, m[idAttribute].toString(), m);
        });
        state.list = data.map(m => m[idAttribute].toString());
        state.isFetchingList = false;
        state.fetchListError = null;
      },

      fetchListError(state, err) {
        state.list = [];
        state.fetchListError = err;
        state.isFetchingList = false;
      }
    });
  }

  if (only.includes('FETCH_SINGLE')) {
    Object.assign(crudMutations, {
      fetchSingleStart(state) {
        state.isFetchingSingle = true;
      },

      fetchSingleSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);
        state.isFetchingSingle = false;
        state.fetchSingleError = null;
      },

      fetchSingleError(state, err) {
        state.fetchSingleError = err;
        state.isFetchingSingle = false;
      }
    });
  }

  if (only.includes('CREATE')) {
    Object.assign(crudMutations, {
      createStart(state) {
        state.isCreating = true;
      },

      createSuccess(state, response) {
        const { data } = response;
        if (data) {
          const id = data[idAttribute].toString();
          Vue.set(state.entities, id, data);
        }
        state.isCreating = false;
        state.createError = null;
      },

      createError(state, err) {
        state.createError = err;
        state.isCreating = false;
      }
    });
  }

  if (only.includes('UPDATE')) {
    Object.assign(crudMutations, {
      updateStart(state) {
        state.isUpdating = true;
      },

      updateSuccess(state, response) {
        const { data } = response;

        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        state.isUpdating = false;
        state.updateError = null;
      },

      updateError(state, err) {
        state.updateError = err;
        state.isUpdating = false;
      }
    });
  }

  if (only.includes('REPLACE')) {
    Object.assign(crudMutations, {
      replaceStart(state) {
        state.isReplacing = true;
      },

      replaceSuccess(state, response) {
        const { data } = response;

        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        state.isReplacing = false;
        state.replaceError = null;
      },

      replaceError(state, err) {
        state.replaceError = err;
        state.isReplacing = false;
      }
    });
  }

  if (only.includes('DESTROY')) {
    Object.assign(crudMutations, {
      destroyStart(state) {
        state.isDestroying = true;
      },

      destroySuccess(state, id) {
        const listIndex = state.list.indexOf(id.toString());

        if (listIndex >= 0) {
          Vue.delete(state.list, listIndex);
        }

        Vue.delete(state.entities, id.toString());

        state.isDestroying = false;
        state.destroyError = null;
      },

      destroyError(state, err) {
        state.destroyError = err;
        state.isDestroying = false;
      }
    });
  }

  return Object.assign(crudMutations, mutations);
};

export default createMutations;
