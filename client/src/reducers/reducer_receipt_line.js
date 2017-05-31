import { LINE_CHANGED } from '../actions/actions_receipt';

export default function (state = 0, action) {
  switch (action.type) {
    case LINE_CHANGED: return action.payload;
    default: return state;
  }
};
