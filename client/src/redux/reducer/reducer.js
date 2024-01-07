import { DOGS_CARGA, ORDER_DOGS, DOGS_DETAILS, LIMPIAR_DOGS, CLEAR_SEARCH, TEMPERAMENT_CARGA, SEARCH_NAME, LAST_SEARCH, FILTER_TEMPERAMENT } from '../actions/actions'
const initialState = {
  dogs: [],
  sortOrder: 'A',
  detail: [],
  temperament: [],
  lastSearch: '',
  search: []
};
const verific = (data) => {
  for (const i in data) {
    if (data[i] === '' || !data[i]) {
      data[i] = 0
    }
  }
  return data
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOGS_CARGA:
      return {
        ...state,
        dogs: action.payload,
        originalDogs: action.payload
      };
    case ORDER_DOGS:
      const datai = [...state.dogs]
      datai.sort((a, b) => {
        if (action.payload === 'A') {
          return a.name.localeCompare(b.name);
        } else if (action.payload === 'D') {
          return b.name.localeCompare(a.name);
        } else if (action.payload === 'B') {
          const wei = a.weight['imperial'].split(' - ').map(Number);
          const pesoA = verific(wei)
          const prom = parseInt(pesoA[0] + pesoA[1]) / 2
          const weiB = b.weight['imperial'].split(' - ').map(Number);
          const pesoB = verific(weiB)
          const promB = (pesoB[0] + pesoB[1]) / 2;
          return prom - promB
        } else if (action.payload === 'C') {
          const wei = a.weight['imperial'].split(' - ').map(Number);
          const pesoA = verific(wei)
          const prom = parseInt(pesoA[0] + pesoA[1]) / 2
          const weiB = b.weight['imperial'].split(' - ').map(Number);
          const pesoB = verific(weiB)
          const promB = (pesoB[0] + pesoB[1]) / 2;
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
        search: action.payload,
        searcHS:  action.payload,
        lastSearch: action.payload.length > 0 ? action.payload : '',
      }
    case LAST_SEARCH:
      return {
        ...state,
        lastSearch: action.payload,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: '',
      };
    case FILTER_TEMPERAMENT:
      const selectedTemperaments = action.payload;
      if(state.search.length !== 0){
        const searcHS = state.searcHS || [...state.search];
        const filteredDogsS = searcHS.filter((dog) => {
          return selectedTemperaments.every((selected) => {
            const temperamentArray = dog.temperament?.split(', ').map((value) => value.trim()) || [];
            return temperamentArray.includes(selected);
          });
        });
        return {
          ...state,
          search: filteredDogsS,
          searcHS: searcHS || [...state.search]
        };  
      }else{
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
      }

    default:
      return state;
  }
};

export default reducer;