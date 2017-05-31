import utils from '../utils/utils';

export const LINE_CHANGED = 'LINE_CHANGED';
export const LINE_NOT_CHANGED = 'LINE_NOT_CHANGED';

export function changeLine(line) {
  if (utils.isInt(parseInt(line, 10)))
    return {
      type: LINE_CHANGED,
      payload: line
    };
  else return {
    type: LINE_NOT_CHANGED
  };
}
