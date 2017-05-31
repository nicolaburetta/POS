import { combineReducers } from 'redux';
import OrderReducer from './reducer_order_items';
import QuantityReducer from './reducer_quantity';
import CurrentReceiptLineReducer from './reducer_receipt_line';

const rootReducer = combineReducers({
  order: OrderReducer,
  currentQuantity: QuantityReducer,
  currentReceiptLine: CurrentReceiptLineReducer
});

export default rootReducer;
