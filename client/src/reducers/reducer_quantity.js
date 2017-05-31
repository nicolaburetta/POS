import { ADD_QUANTITY, REMOVE_QUANTITY, RESET_QUANTITY } from '../actions/actions_quantity';

export default function(state = 1, action) {
  switch (action.type) {
    case ADD_QUANTITY:
      return state + action.payload;
    case REMOVE_QUANTITY:
      return action.payload >= state ? state : state - action.payload;
    case RESET_QUANTITY:
      return action.payload;
    default:
      return state;
  }
};
