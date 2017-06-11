import { LINE_CHANGED } from '../actions/actions_receipt';

export default function (state = -1, action) {
  switch (action.type) {
    case LINE_CHANGED:
      return action.payload > -2 ? action.payload : -1;
    default: return state;
  }
};
