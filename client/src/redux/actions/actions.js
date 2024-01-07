import axios from 'axios';
export const ORDER_DOGS = 'DOGS_ORDER'
export const DOGS_CARGA = 'DOGS_CARGA'
export const DOGS_DETAILS = 'DOGS_DETAILS'
export const LIMPIAR_DOGS = 'LIMPIAR_DOGS'
export const TEMPERAMENT_CARGA = 'TEMPERAMENT_CARGA'
export const SEARCH_NAME = 'SEARCH_NAME'
export const LAST_SEARCH = 'LAST_SEARCH'
export const ORDER_BYOLD = 'ORDER_BYOLD'
export const FILTER_TEMPERAMENT = 'FILTER_TEMPERAMENT'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
const URL = 'http://localhost:3001/dogs/';
const URLT = 'http://localhost:3001/temperament';
const URLS = 'http://localhost:3001/search/name?name='

export const getAllDogs = () => async (dispatch) => {
  try {
    const response = await axios.get(URL);
    dispatch({
      type: DOGS_CARGA,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    window.alert('Error al obtener datos');
  }
};
export const getAllTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get(URLT);
    dispatch({
      type: TEMPERAMENT_CARGA,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    window.alert('Error al obtener datos');
  }
};
export const orderDogs = (order) => ({
  type: ORDER_DOGS,
  payload: order,
});
export const limpiarDogs = () => ({
  type: LIMPIAR_DOGS,
});

export const getDogById = (id) => async (dispatch) => {
  dispatch(limpiarDogs());
  try {
    const response = await axios.get(`${URL}${id}`)
    dispatch({
      type: DOGS_DETAILS,
      payload: response.data
    })
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    window.alert('Error al obtener datos');
  }
}
const setDogs = (dogs) => ({
  type: SEARCH_NAME,
  payload: dogs,
});
const lastSearch = (lastSearch) => ({
  type: LAST_SEARCH,
  payload: lastSearch,
});
export const getDogByName = (name) => async (dispatch, getState) => {
  try {
    if (name.length > 0) {
      const response = await axios.get(`${URLS}${name}`);
      if (response.status >= 200 && response.status <= 300) {
        const dogsData = response.data;
        if (dogsData) {
          dispatch(setDogs(dogsData));
          dispatch(lastSearch(name));
        } else {
          window.alert("Raza no encontrada");
        }
      }
    }
  } catch (error) {
    if(error.request.status===404){
      window.alert('Error ' + error.request.status + ' No existe la raza')
    } else if(error.request.status ===500)
    {
      window.alert('Error ' + error.request.status + ' error de coneion')
    }
    console.error('Error', error);
  }
};
export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});
export const filterDogsByTemperaments = (selectedTemperaments) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload: selectedTemperaments,
  };
};