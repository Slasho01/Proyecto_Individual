import axios from 'axios';
export const ORDER_DOGS = 'DOGS_ORDER'
export const DOGS_CARGA = 'DOGS_CARGA'
export const DOGS_DETAILS = 'DOGS_DETAILS'
export const LIMPIAR_DOGS = 'LIMPIAR_DOGS'
export const TEMPERAMENT_CARGA = 'TEMPERAMENT_CARGA'
const URL = 'http://localhost:3001/dogs/';
const URLT = 'http://localhost:3001/temperament';

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