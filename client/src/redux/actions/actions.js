export const ORDER = 'ORDER'

export const orderCards = (order) => {
    return (dispatch) => {
       return dispatch({
          type: 'ORDER',
          payload: order,
       });
    }
 };