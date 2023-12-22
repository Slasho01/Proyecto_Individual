import { DOGS_CARGA, ORDER_DOGS, DOGS_DETAILS, LIMPIAR_DOGS, TEMPERAMENT_CARGA, SEARCH_NAME, LAST_SEARCH, ORDER_BYOLD } from '../actions/actions'
const initialState = {
  dogs: [],
  sortOrder: 'A',
  detail: [],
  temperament: [],
  search: [],
  lastSearch: '',


};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOGS_CARGA:
      return {
        ...state,
        dogs: action.payload,
      };
    case ORDER_DOGS:
      const datai = state.search.length === 0 ? [...state.dogs] : [...state.search]
      datai.sort((a, b) => {
        if (action.payload === 'A') {
          return a.name.localeCompare(b.name);
        } else if (action.payload === 'D') {
          return b.name.localeCompare(a.name);
        } else if(action.payload === 'B'){
          const wei = a.weight['imperial'].split(' - ').map(Number);
          const prom = parseInt(wei[0] + wei[1]) / 2
          const weiB = b.weight['imperial'].split(' - ').map(Number);
          const promB = (weiB[0] + weiB[1]) / 2;
          return prom - promB
        } else if(action.payload === 'C'){
          const wei = a.weight['imperial'].split(' - ').map(Number);
          const prom = parseInt(wei[0] + wei[1]) / 2
          const weiB = b.weight['imperial'].split(' - ').map(Number);
          const promB = (weiB[0] + weiB[1]) / 2;
          return promB - prom
        }
        return 0;
      })
      return {
        ...state,
        search: datai,
        dogs: datai,
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