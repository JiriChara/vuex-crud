const createActions = ({
  actions,
  rootUrl,
  client,
  only,
  parseList,
  parseSingle,
  parseError
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
      /**
       * GET /api/<resourceName>
       *
       * Fetch list of resources.
       */
      fetchList({ commit }, { config, customUrl, customUrlFnArgs = [] } = {}) {
        commit('fetchListStart');

        return client.get(urlGetter({ customUrl, customUrlFnArgs, type: FETCH_LIST }), config)
          .then((res) => {
            const parsedResponse = parseList(res);

            commit('fetchListSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('fetchListError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(FETCH_SINGLE)) {
    Object.assign(crudActions, {
      /**
       * GET /api/<resourceName>/:id
       *
       * Fetch single resource.
       */
      fetchSingle({ commit }, {
        id,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('fetchSingleStart');

        return client.get(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: FETCH_SINGLE,
          id
        }), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('fetchSingleSuccess', parsedResponse);

            return res;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('fetchSingleError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(CREATE)) {
    Object.assign(crudActions, {
      /**
       * POST /api/<resourceName>
       *
       * Create a new reource.
       */
      create({ commit }, {
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('createStart');

        return client.post(urlGetter({ customUrl, customUrlFnArgs, type: CREATE }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('createSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('createError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(UPDATE)) {
    Object.assign(crudActions, {
      /**
       * PATCH /api/<resouceName>/:id
       *
       * Update a single resource.
       */
      update({ commit }, {
        id,
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('updateStart');

        return client.patch(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: UPDATE,
          id
        }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('updateSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('updateError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(REPLACE)) {
    Object.assign(crudActions, {
      /**
       * PUT /api/<resouceName>/:id
       *
       * Update a single resource.
       */
      replace({ commit }, {
        id,
        data,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('replaceStart');

        return client.put(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: REPLACE,
          id
        }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('replaceSuccess', parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('replaceError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  if (only.includes(DESTROY)) {
    Object.assign(crudActions, {
      /**
       * DELETE /api/<resouceName>/:id
       *
       * Destroy a single resource.
       */
      destroy({ commit }, {
        id,
        config,
        customUrl,
        customUrlFnArgs = []
      } = {}) {
        commit('destroyStart');

        return client.delete(urlGetter({
          customUrl,
          customUrlFnArgs,
          type: DESTROY,
          id
        }), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);

            commit('destroySuccess', id, parsedResponse);

            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);

            commit('destroyError', parsedError);

            return Promise.reject(parsedError);
          });
      }
    });
  }

  return Object.assign(crudActions, actions);
};

export default createActions;
