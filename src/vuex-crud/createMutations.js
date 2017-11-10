import Vue from 'vue';

/**
 * Create default mutations and merge them with mutations defined by a user.
 */
const createMutations = ({
  mutations,
  only,
  idAttribute,
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
}) => {
  const crudMutations = {};

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudMutations, {
      fetchListStart(state) {
        state.isFetchingList = true;
        onFetchListStart(state);
      },

      fetchListSuccess(state, response) {
        const { data } = response;

        data.forEach((m) => {
          Vue.set(state.entities, m[idAttribute].toString(), m);
        });
        state.list = data.map(m => m[idAttribute].toString());
        state.isFetchingList = false;
        state.fetchListError = null;
        onFetchListSuccess(state, response);
      },

      fetchListError(state, err) {
        state.list = [];
        state.fetchListError = err;
        state.isFetchingList = false;
        onFetchListError(state, err);
      }
    });
  }

  if (only.includes('FETCH_SINGLE')) {
    Object.assign(crudMutations, {
      fetchSingleStart(state) {
        state.isFetchingSingle = true;
        onFetchSingleStart(state);
      },

      fetchSingleSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();
        const index = state.singles.indexOf(id);

        Vue.set(state.entities, id, data);
        if (index >= 0) {
          Vue.set(state.singles, index, id);
        } else {
          state.singles.push(id);
        }
        state.isFetchingSingle = false;
        state.fetchSingleError = null;
        onFetchSingleSuccess(state, response);
      },

      fetchSingleError(state, err) {
        state.fetchSingleError = err;
        state.isFetchingSingle = false;
        onFetchSingleError(state, err);
      }
    });
  }

  if (only.includes('CREATE')) {
    Object.assign(crudMutations, {
      createStart(state) {
        state.isCreating = true;
        onCreateStart(state);
      },

      createSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);
        state.singles.push(id);
        state.isCreating = false;
        state.createError = null;
        onCreateSuccess(state, response);
      },

      createError(state, err) {
        state.createError = err;
        state.isCreating = false;
        onCreateError(state, err);
      }
    });
  }

  if (only.includes('UPDATE')) {
    Object.assign(crudMutations, {
      updateStart(state) {
        state.isUpdating = true;
        onUpdateStart(state);
      },

      updateSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        const singlesIndex = state.singles.indexOf(id);

        if (singlesIndex >= 0) {
          Vue.set(state.singles, singlesIndex, id);
        }

        state.isUpdating = false;
        state.updateError = null;
        onUpdateSuccess(state, response);
      },

      updateError(state, err) {
        state.updateError = err;
        state.isUpdating = false;
        onUpdateError(state, err);
      }
    });
  }

  if (only.includes('REPLACE')) {
    Object.assign(crudMutations, {
      replaceStart(state) {
        state.isReplacing = true;
        onReplaceStart(state);
      },

      replaceSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        const singlesIndex = state.singles.indexOf(id);

        if (singlesIndex >= 0) {
          Vue.set(state.singles, singlesIndex, id);
        }

        state.isReplacing = false;
        state.replaceError = null;
        onReplaceSuccess(state, response);
      },

      replaceError(state, err) {
        state.replaceError = err;
        state.isReplacing = false;
        onReplaceError(state, err);
      }
    });
  }

  if (only.includes('DESTROY')) {
    Object.assign(crudMutations, {
      destroyStart(state) {
        state.isDestroying = true;
        onDestroyStart(state);
      },

      destroySuccess(state, id, response) {
        const listIndex = state.list.indexOf(id.toString());
        const singlesIndex = state.singles.indexOf(id.toString());

        if (listIndex >= 0) {
          Vue.delete(state.list, listIndex);
        }

        if (singlesIndex >= 0) {
          Vue.delete(state.singles, singlesIndex);
        }

        Vue.delete(state.entities, id.toString());

        state.isDestroying = false;
        state.destroyError = null;
        onDestroySuccess(state, response);
      },

      destroyError(state, err) {
        state.destroyError = err;
        state.isDestroying = false;
        onDestroyError(state, err);
      }
    });
  }

  return Object.assign(crudMutations, mutations);
};

export default createMutations;
