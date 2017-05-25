import { DISH_SELECTED, ITEM_REMOVED } from '../actions/index';
import Order from '../models/order_model';
import utils from '../utils/utils';

export default function (state = [], action) {
  switch (action.type) {
    case DISH_SELECTED:
      var orderItem = Order.createItem(
        action.payload.id,
        action.payload.name,
        action.payload.price,
        action.payload.quantity,
        action.payload.add,
        action.payload.remove);
      return (!orderItem) ? state : [...state, orderItem];
    case ITEM_REMOVED:
      if (utils.isInt(parseInt(action.payload, 10))) {
        var newState = [];
        for (var i = 0; i < state.length; i++) {
          if (parseInt(i, 10) !== parseInt(action.payload, 10)) {
            newState.push(state[i]);
          }
        }
        return newState;
      }
      return state;
    default:
      return state;
  }
};
