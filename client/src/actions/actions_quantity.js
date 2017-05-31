export const ADD_QUANTITY = 'ADD_QUANTITY';
export const REMOVE_QUANTITY = 'REMOVE_QUANTITY';
export const RESET_QUANTITY = 'SET_QUANTITY';

export function addQuantity(amount) {
  return {
    type: ADD_QUANTITY,
    payload: amount
  };
};

export function removeQuantity(amount) {
  return {
    type: REMOVE_QUANTITY,
    payload: amount
  };
};

export function resetQuantity() {
  return {
    type: RESET_QUANTITY,
    payload: 1
  };
}
