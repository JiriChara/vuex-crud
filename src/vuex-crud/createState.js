const createState = ({ state }) => Object.assign({}, {
  list: [],
  entities: {},

  isFetchingList: false,
  fetchListError: null,

  isFetchingSingle: false,
  fetchSingleError: null,

  isCreating: false,
  createError: null,

  isUpdating: false,
  updateError: null,

  isReplacing: false,
  replaceError: null,

  isDestroying: false,
  destroyError: null
}, state);

export default createState;
