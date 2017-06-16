var utils = require('../utils/utils.js');

function createItem(_type_id, _id, _name, _price, _quantity, _add, _remove) {
	if (utils.isInt(_type_id)
			&& utils.isInt(_id) && _id > 0
			&& utils.isString(_name)
			&& (utils.isInt(_price) || utils.isFloat(_price))
			&& utils.isInt(_quantity) && _quantity > 0
			&& utils.isStringArray(_add)
			&& utils.isStringArray(_remove)) {
			return {
				type_id: _type_id,
				id: _id,
				name: _name,
				price: _price,
				quantity: _quantity,
				add: _add,
				remove: _remove
			};
		}
	return false;
}

function deleteItem(items, position) {
	if (utils.isInt(position)
		&& utils.isOrderItemArray(items)
		&& position < this.items.length && position >= 0) {
		items.splice(position, 1);
		return items;
	}
	return false;
}

function total(items) {
	if (utils.isOrderItemArray(items)) {
		var tot = 0.0;
		for (var item in items) {
			tot += (item.price * item.quantity);
		}
		return tot;
	}
	return false;
}

module.exports = {
	createItem: createItem,
	deleteItem: deleteItem,
	total: total
};
