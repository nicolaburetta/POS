function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function isString(s) {
  return (typeof s === 'string' || s instanceof String);
}

function isStringArray(array) {
	var index = 0;
	var check = Array.isArray(array);

	while (index < array.length && check) {
		check = isString(array[index]);
		index++;
	}

	return check;
}

function isIpAddress(address) {
  return (
    isString(address) &&
    address.split('.').length === 4 &&
    isInt(parseInt(address.split('.')[0], 10)) &&
    isInt(parseInt(address.split('.')[1], 10)) &&
    isInt(parseInt(address.split('.')[2], 10)) &&
    isInt(parseInt(address.split('.')[3], 10)) &&
    parseInt(address.split('.')[0], 10) < 256 &&
    parseInt(address.split('.')[1], 10) < 256 &&
    parseInt(address.split('.')[2], 10) < 256 &&
    parseInt(address.split('.')[3], 10) < 256
  );
}

function isUndefined(something) {
  return typeof something === 'undefined';
}

function isOrderItem(item) {
  return !isUndefined(item.type_id)
      && !isUndefined(item.id)
      && !isUndefined(item.name)
      && !isUndefined(item.price)
      && !isUndefined(item.quantity)
      && !isUndefined(item.add)
      && !isUndefined(item.remove)
      && isInt(item.id) && item.id > 0
			&& isString(item.name)
			&& (isInt(item.price) || isFloat(item.price))
			&& isInt(item.quantity) && item.quantity > 0
			&& isStringArray(item.add)
			&& isStringArray(item.remove);
}

function isOrderItemArray(array) {
  var index = 0;
  var check = Array.isArray(array);

  while (index < array.length && check) {
    check = isOrderItem(array[index]);
    index++;
  }

  return check;
}

function getDate() {
  var date = new Date();

  var day = date.getDay();
  var num_day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (day === 0) day = 'Dom';
  else if (day === 1) day = 'Lun';
  else if (day === 2) day = 'Mar';
  else if (day === 3) day = 'Mer';
  else if (day === 4) day = 'Gio';
  else if (day === 5) day = 'Ven';
  else if (day === 6) day = 'Sab';

  if (month === 0) month = '1';
  else if (month === 1) month = '2';
  else if (month === 2) month = '3';
  else if (month === 3) month = '4';
  else if (month === 4) month = '5';
  else if (month === 5) month = '6';
  else if (month === 6) month = '7';
  else if (month === 7) month = '8';
  else if (month === 8) month = '9';
  else if (month === 9) month = '10';
  else if (month === 10) month = '11';
  else if (month === 11) month = '12';

  if (minutes < 10) minutes = '0' + minutes;

  return day + ' ' + num_day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
}

// return the ready-to-print number
function formatNumber(number) {
	var n = number.toString();
	if (isFloat(number)) {
		n = n.split('.')[1].length === 1 ? n + '0' : n;
		n = n.replace('.', ',');
	} else if (isInt(number)) {
		n += ',00';
	}

	return n;
}

function spaces(reps) {
	var s = '';
	for (var i = 0; i < reps; i++) {
		s += ' ';
	}
	return s;
}

module.exports = {
  isInt: isInt,
  isFloat: isFloat,
  isString: isString,
  isUndefined: isUndefined,
  isOrderItem: isOrderItem,
  isOrderItemArray: isOrderItemArray,
  getDate: getDate,
  formatNumber: formatNumber,
  isStringArray: isStringArray,
  isIpAddress: isIpAddress,
  spaces: spaces
};
