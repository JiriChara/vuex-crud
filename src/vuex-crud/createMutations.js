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

        state.list = data.map(m => m[idAttribute].toString());
        data.forEach((m) => {
          state.entities[m[idAttribute].toString()] = m;
        });
        state.isFetchingList = false;
        state.fetchListError = null;
        onFetchListSuccess(state, response);
      },

      fetchListError(state, err) {
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

        Vue.set(state.list, state.list);
        Vue.set(state.entities, id, data);
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

        state.list.push(id);
        state.entities[id] = data;
        state.isCreating = false;
        state.createError = null;
        onCreateSuccess(response);
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
        Vue.set(state.list, state.list.indexOf(id), id);

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
        Vue.set(state.list, state.list.indexOf(id), id);

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
        Vue.delete(state.list, state.list.indexOf(id.toString()));
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
