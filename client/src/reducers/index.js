import { combineReducers } from 'redux';
import OrderReducer from './reducer_order_items';

const rootReducer = combineReducers({
  order: OrderReducer
});

export default rootReducer;
