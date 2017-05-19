import { DISH_SELECTED } from '../actions/index';
import Order from '../../../models/order_model';

export default function (state = [], action) {
  switch (action.type) {
    case DISH_SELECTED:
      var orderItem = Order.createItem(
        action.payload.id,
        action.payload.name,
        action.payload.price,
        1,
        [],
        []);
      return (!orderItem) ? state : [...state, orderItem];
    default:
      return state;
  }
};
