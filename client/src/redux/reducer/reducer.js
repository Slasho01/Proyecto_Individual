import { DOGS_CARGA, ORDER_DOGS, DOGS_DETAILS, LIMPIAR_DOGS, TEMPERAMENT_CARGA, SEARCH_NAME, LAST_SEARCH } from '../actions/actions'
const initialState = {
  dogs: [],
  sortOrder: 'A',
  detail: [],
  temperament: [],
  search: [],
  lastSearch: ''

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOGS_CARGA:
      return {
        ...state,
        dogs: action.payload,
      };
    case ORDER_DOGS:
      const sortedd = [...state.dogs]
      const sortedOrder = [...state.search]
      sortedd.sort((a, b) => {
        if (action.payload === 'A') {
          return a.name.localeCompare(b.name);
        } else if (action.payload === 'D') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      })
      sortedOrder.sort((a, b) => {
        if (action.payload === 'A') {
          return a.name.localeCompare(b.name);
        } else if (action.payload === 'D') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      })
      return {
        ...state,
        search: sortedOrder,
        dogs: sortedd,
      };
    case DOGS_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case LIMPIAR_DOGS:
      return {
        ...state,
        detail: null,
      };
    case TEMPERAMENT_CARGA:
      return {
        ...state,
        temperament: action.payload,
      };
    case SEARCH_NAME:
      return {
        ...state,
        search: action.payload,
      }
    case LAST_SEARCH:
      return {
        ...state,
        lastSearch: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;