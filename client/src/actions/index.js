export const DISH_SELECTED = 'DISH_SELECTED';
export const ITEM_REMOVED = 'ITEM_REMOVED';

export function selectDish(_dish, _quantity, _add, _remove) {
  return {
    type: DISH_SELECTED,
    payload: {
      id: _dish.id,
      name: _dish.name,
      price: _dish.price,
      quantity: _quantity,
      add: _add,
      remove: _remove
    }
  };
};

export function removeItem(index) {
  return {
    type: ITEM_REMOVED,
    payload: index
  };
};
