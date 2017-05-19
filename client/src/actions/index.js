export const DISH_SELECTED = 'DISH_SELECTED';

export function selectDish(dish) {
  return {
    type: DISH_SELECTED,
    payload: dish
  };
}
