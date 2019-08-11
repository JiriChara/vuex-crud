const createActions = ({
  actions,
  rootUrl,
  client,
  only,
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
}) => {
  const [
    FETCH_LIST,
    FETCH_SINGLE,
    CREATE,
    UPDATE,
    REPLACE,
    DESTROY
  ] = ['FETCH_LIST', 'FETCH_SINGLE', 'CREATE', 'UPDATE', 'REPLACE', 'DESTROY'];
  const crudActions = {};
  const isUsingCustomUrlGetter = typeof rootUrl === 'function';

  const urlGetter = ({
    customUrl,
    customUrlFnArgs,
    id,
    type
  }) => {
    if (typeof customUrl === 'string') {
      return customUrl;
    } else if (isUsingCustomUrlGetter) {
      const argsArray = Array.isArray(customUrlFnArgs) ? customUrlFnArgs : [customUrlFnArgs];
      const args = [id || null, type || null].concat(argsArray);
      return rootUrl(...args);
    }

    return id ? `${rootUrl}/${id}` : rootUrl;
  };

  if (only.includes(FETCH_LIST)) {
    Object.assign(crudActions, {
      onFetchListStart,
      onFetchListSuccess,
      onFetchListError,
      /**
       * GET /api/<resourceName>
       *
       * Fetch list of resources.
       */
      fetchList({ commit, dispatch }, { config, customUrl, customUrlFnArgs = [] } = {}) {
        commit('fetchListStart');
        dispatch('onFetchListStart');
        return client.get(urlGetter({ customUrl, customUrlFnArgs, type: FETCH_LIST }), config)
          .then((res) => {
            const parsedResponse = parseList(res);

            commit('fetchListSuccess', parsedResponse);
            dispatch('onFetchListSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('fetchListError', parsedError);
            dispatch('onFetchListError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(FETCH_SINGLE)) {
    Object.assign(crudActions, {
      onFetchSingleStart,
      onFetchSingleSuccess,
      onFetchSingleError,
      /**
       * GET /api/<resourceName>/:id
       *
       * Fetch single resource.
       */
      fetchSingle({ commit, dispatch }, {
        id,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('fetchSingleStart');
        dispatch('onFetchSingleStart');
        return client.get(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: FETCH_SINGLE,
          id
        }), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('fetchSingleSuccess', parsedResponse);
            dispatch('onFetchSingleSuccess', parsedResponse);

            return res;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('fetchSingleError', parsedError);
            dispatch('onFetchSingleError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(CREATE)) {
    Object.assign(crudActions, {
      onCreateStart,
      onCreateSuccess,
      onCreateError,
      /**
       * POST /api/<resourceName>
       *
       * Create a new reource.
       */
      create({ commit, dispatch }, {
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('createStart');
        dispatch('onCreateStart');
        return client.post(urlGetter({ customUrl, customUrlFnArgs, type: CREATE }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('createSuccess', parsedResponse);
            dispatch('onCreateSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('createError', parsedError);
            dispatch('onCreateError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(UPDATE)) {
    Object.assign(crudActions, {
      onUpdateStart,
      onUpdateSuccess,
      onUpdateError,
      /**
       * PATCH /api/<resouceName>/:id
       *
       * Update a single resource.
       */
      update({ commit, dispatch }, {
        id,
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('updateStart');
        dispatch('onUpdateStart');
        return client.patch(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: UPDATE,
          id
        }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('updateSuccess', parsedResponse);
            dispatch('onUpdateSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('updateError', parsedError);
            dispatch('onUpdateError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(REPLACE)) {
    Object.assign(crudActions, {
      onReplaceStart,
      onReplaceSuccess,
      onReplaceError,
      /**
       * PUT /api/<resouceName>/:id
       *
       * Update a single resource.
       */
      replace({ commit, dispatch }, {
        id,
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('replaceStart');
        dispatch('onReplaceStart');
        return client.put(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: REPLACE,
          id
        }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('replaceSuccess', parsedResponse);
            dispatch('onReplaceSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('replaceError', parsedError);
            dispatch('onReplaceError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(DESTROY)) {
    Object.assign(crudActions, {
      onDestroyStart,
      onDestroySuccess,
      onDestroyError,
      /**
       * DELETE /api/<resouceName>/:id
       *
       * Destroy a single resource.
       */
      destroy({ commit, dispatch }, {
        id,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('destroyStart');
        dispatch('onDestroyStart');
        return client.delete(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: DESTROY,
          id
        }), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('destroySuccess', id, parsedResponse);
            dispatch('onDestroySuccess', id, parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('destroyError', parsedError);
            dispatch('onDestroyError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  return Object.assign(crudActions, actions);
};

export default createActions;
