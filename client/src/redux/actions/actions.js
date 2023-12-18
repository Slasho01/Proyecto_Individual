import axios from 'axios';
export const ORDER_DOGS = 'DOGS_ORDER'
export const DOGS_CARGA = 'DOGS_CARGA'
export const DOGS_DETAILS = 'DOGS_DETAILS'
export const LIMPIAR_DOGS = 'LIMPIAR_DOGS'
export const TEMPERAMENT_CARGA = 'TEMPERAMENT_CARGA'
export const SEARCH_NAME = 'SEARCH_NAME'
export const LAST_SEARCH = 'LAST_SEARCH'
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
const setDogs = (search) => ({
  type: SEARCH_NAME,
  payload: search,
});
const lastSearch = (lastSearch) => ({
  type: LAST_SEARCH,
  payload: lastSearch,
});
export const getDogByName = (name) => async (dispatch, getState) => {
  try {
    if (name.length > 0) {
      const response = await axios.get(`${URLS}${name}`)
      if (response.status >= 200 && response.status <= 300) {
        const dogsData = response.data
        if (dogsData) {
          dispatch(setDogs(dogsData));
          dispatch(lastSearch(name));
        } else {
          window.alert("Raza no encontrada");
        }
      }else{
        throw new Error('Error de conexión');
      }
    }else if(name.length === 0){
      const { dogs } = getState();
      dispatch(setDogs(dogs));
      dispatch(lastSearch(''));
    }
  } catch (error) {
    console.error('Error', error);
  }
}