function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function isString(s) {
  return (typeof s == 'string' || s instanceof String);
}

function isStringArray(array) {
	var index = 0;
	var check = true;

	while (index < array.length && check) {
		check = isString(array[index]);
		index++;
	}

	return check;
}

function isIpAddress(address) {
  return (
    isString(address) &&
    address.split('.').length == 4 &&
    isInt(parseInt(address.split('.')[0])) &&
    isInt(parseInt(address.split('.')[1])) &&
    isInt(parseInt(address.split('.')[2])) &&
    isInt(parseInt(address.split('.')[3])) &&
    parseInt(address.split('.')[0]) < 256 &&
    parseInt(address.split('.')[1]) < 256 &&
    parseInt(address.split('.')[2]) < 256 &&
    parseInt(address.split('.')[3]) < 256
  );
}

// return the ready-to-print number
function formatNumber(number) {
	var n = number.toString();
	if (isFloat(number)) {
		n = n.split('.')[1].length == 1 ? n + '0' : n;
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
  formatNumber: formatNumber,
  isStringArray: isStringArray,
  isIpAddress: isIpAddress,
  spaces: spaces
};
