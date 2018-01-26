const createActions = ({
  actions,
  rootUrl,
  client,
  only,
  parseList,
  parseSingle,
  parseError
}) => {
  const crudActions = {};
  const isUsingCustomUrlGetter = typeof rootUrl === 'function';

  const urlGetter = ({ customUrl, customUrlFnArgs, id }) => {
    if (typeof customUrl === 'string') {
      return customUrl;
    } else if (isUsingCustomUrlGetter) {
      return rootUrl(...customUrlFnArgs);
    }

    return id ? `${rootUrl}/${id}` : rootUrl;
  };

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudActions, {
      /**
       * GET /api/<resourceName>
       *
       * Fetch list of resources.
       */
      fetchList({ commit }, { config, customUrl, customUrlFnArgs = [] } = {}) {
        commit('fetchListStart');

        return client.get(urlGetter({ customUrl, customUrlFnArgs }), config)
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

  if (only.includes('FETCH_SINGLE')) {
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

        return client.get(urlGetter({ id, customUrl, customUrlFnArgs }), config)
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

  if (only.includes('CREATE')) {
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

        return client.post(urlGetter({ customUrl, customUrlFnArgs }), data, config)
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

  if (only.includes('UPDATE')) {
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

        return client.patch(urlGetter({ id, customUrl, customUrlFnArgs }), data, config)
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

  if (only.includes('REPLACE')) {
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

        return client.put(urlGetter({ id, customUrl, customUrlFnArgs }), data, config)
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

  if (only.includes('DESTROY')) {
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

        return client.delete(urlGetter({ id, customUrl, customUrlFnArgs }), config)
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
