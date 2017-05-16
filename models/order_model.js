
var utils = require('../utils/utils.js');

function createItem(_name, _price, _add, _remove) {
	return {
		name: _name,
		price: _price,
		add: _add,
		remove: _remove
	};
}

var order = {
	items: [],
	insert: function(name, price, add, remove) {
		if ((typeof name == 'string' || name instanceof String)
				&& (utils.isInt(price) || utils.isFloat(price))
				&& Array.isArray(add)
				&& utils.isStringArray(add)
				&& Array.isArray(remove)
				&& utils.isStringArray(remove)) {

			this.items.push(createItem(name, price, add, remove));
			return 'Element correctly inserted';
		}

		return 'Element not inserted. Check the arguments!';
	},
	delete: function(position) {
		if (utils.isInt(position) && position < this.items.length && position >= 0) {
			this.items.splice(position, 1);
			return 'Element correctly deleted';
		}

		return 'Element not deleted. Check the arguments!';
	},
	delete_last: function() {
		if (this.items.length > 0) {
			this.items.splice(this.items.length - 1, 1);
			return 'Last element correctly deleted';
		}

		return 'This order has no items to delete!';
	},
	clean: function() {
		this.items = [];
	}
};

module.exports = order;
