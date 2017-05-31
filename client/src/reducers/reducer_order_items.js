import { DISH_SELECTED, ITEM_REMOVED, ITEM_MODIFIED } from '../actions/actions_order';
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
        var newState_rem = [];
        for (var i_rem = 0; i_rem < state.length; i_rem++) {
          if (parseInt(i_rem, 10) !== parseInt(action.payload, 10)) {
            newState_rem.push(state[i_rem]);
          }
        }
        return newState_rem;
      }
      return state;
    case ITEM_MODIFIED:
      var newState_mod = [];
      for (var i_mod = 0; i_mod < state.length; i_mod++) {
        if (parseInt(i_mod, 10) !== parseInt(action.payload.index, 10)) newState_mod.push(state[i_mod]);
        else {
          var item = state[i_mod];
          item.quantity = action.payload.quantity;
          newState_mod.push(item);
        }
      }
      return newState_mod;
    default:
      return state;
  }
};
