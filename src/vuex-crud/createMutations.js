import Vue from 'vue';

const createMutations = ({ mutations, only, idAttribute }) => {
  const crudMutations = {};

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudMutations, {
      fetchListStart(state) {
        state.isFetchingList = true;
      },

      fetchListSuccess(state, { data }) {
        state.list = data.map(m => m[idAttribute].toString());
        data.forEach((m) => {
          state.entities[m[idAttribute].toString()] = m;
        });
        state.isFetchingList = false;
        state.fetchListError = null;
      },

      fetchListError(state, err) {
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

      fetchSingleSuccess(state, { data }) {
        const id = data[idAttribute].toString();

        if (state.list.indexOf(id) === -1) {
          state.list.push(id);
        } else {
          Vue.set(state.list, state.list);
        }
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

      createSuccess(state, { data }) {
        const id = data[idAttribute].toString();

        state.list.push(id);
        state.entities[id] = data;
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

      updateSuccess(state, { data }) {
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);
        Vue.set(state.list, state.list.indexOf(id), id);

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

      replaceSuccess(state, { data }) {
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);
        Vue.set(state.list, state.list.indexOf(id), id);

        state.isReplacing = false;
        state.replaceError = null;
      },

      updateError(state, err) {
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
        Vue.delete(state.list, state.list.indexOf(id.toString()));
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
