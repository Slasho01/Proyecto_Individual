import { DOGS_CARGA, ORDER_DOGS, DOGS_DETAILS, LIMPIAR_DOGS, TEMPERAMENT_CARGA, SEARCH_BYNAME } from '../actions/actions'
const initialState = {
  dogs: [],
  sortOrder: 'A',
  detail:[],
  temperament:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOGS_CARGA:
      return {
        ...state,
        dogs: action.payload,
      };
    case ORDER_DOGS:
      const sortedDogs = [...state.dogs];
      sortedDogs.sort((a, b) => {
        if (action.payload === 'A') {
          return a.name.localeCompare(b.name);
        } else if (action.payload === 'D') {
          return b.name.localeCompare(a.name);
        } else if (action.payload === 'B') {
          return a.weight.imperial.localeCompare(b.weight.imperial)
        } else if (action.payload === 'C') {
          return b.weight.imperial.localeCompare(a.weight.imperial)
        }
        return 0;
      });
      console.log(sortedDogs)
      return {
        ...state,
        dogs: sortedDogs,
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
        case SEARCH_BYNAME:

    default:
      return state;
  }
};

export default reducer;