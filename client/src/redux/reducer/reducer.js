import { DOGS_CARGA, ORDER_DOGS, DOGS_DETAILS, LIMPIAR_DOGS, TEMPERAMENT_CARGA, SEARCH_NAME, LAST_SEARCH, FILTER_TEMPERAMENT } from '../actions/actions'
const initialState = {
  dogs: [],
  sortOrder: 'A',
  detail: [],
  temperament: [],
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
      const datai = [...state.dogs]
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
        dogs: action.payload,
      }
    case LAST_SEARCH:
      return {
        ...state,
        lastSearch: action.payload,
      };
    case FILTER_TEMPERAMENT:
      const selectedTemperaments = action.payload;
      const originalDogs = state.originalDogs || [...state.dogs];
      const filteredDogs = originalDogs.filter((dog) => {
        return selectedTemperaments.every((selected) => {
          const temperamentArray = dog.temperament?.split(', ').map((value) => value.trim()) || [];
          return temperamentArray.includes(selected);
        });
      });
      return {
        ...state,
        dogs: filteredDogs,
        originalDogs: originalDogs || [...state.dogs], 
      };

    default:
      return state;
  }
};

export default reducer;