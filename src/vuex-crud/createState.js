const createState = ({ state, only }) => {
  const crudState = {
    list: [],
    entities: {}
  };

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudState, {
      isFetchingList: false,
      fetchListError: null
    });
  }

  if (only.includes('FETCH_SINGLE')) {
    Object.assign(crudState, {
      isFetchingSingle: false,
      fetchSingleError: null
    });
  }

  if (only.includes('CREATE')) {
    Object.assign(crudState, {
      isCreating: false,
      createError: null
    });
  }

  if (only.includes('UPDATE')) {
    Object.assign(crudState, {
      isUpdating: false,
      updateError: null
    });
  }

  if (only.includes('REPLACE')) {
    Object.assign(crudState, {
      isReplacing: false,
      replaceError: null
    });
  }

  if (only.includes('DESTROY')) {
    Object.assign(crudState, {
      isDestroying: false,
      destroyError: null
    });
  }

  return Object.assign(crudState, state);
};

export default createState;
