var net = require('net');
var utils = require('./utils.js');

// printer props
const FIRST_PRINTER_ADDRESS = 120;
const LAST_PRINTER_ADDRESS = 129;
const DEFAULT_PRINTER_TIMEOUT = 2000;
const DEFAULT_PRINTERS_LOOKUP_TIMEOUT = DEFAULT_PRINTER_TIMEOUT + 1000;

// printer commands
const commands = {

  // receipt props
  LINE_N_CHAR: 48,
  DEFAULT_MAX_CHAR: 35,
  N_SPACES: 8,
  DEFAULT_PRICE_N_CHAR: 5,
  DEFAULT_RETURN: 2,
  DEFAULT_ADD_REM_RETURN: 6,

  // ESC-POS commands
  INITIALIZE: new Buffer([
  	0x1B,
  	0x40]),
  NEW_LINE: '\n',
  JUST_LEFT: new Buffer([
  	0x1B,
  	0x61,
  	0x00]),
  JUST_CENTER: new Buffer([
  	0x1B,
  	0x61,
  	0x01]),
  JUST_RIGHT: new Buffer([
  	0x1B,
  	0x61,
  	0x02]),
  CHAR_A: new Buffer([
  	0x1B,
  	0x4D,
  	0x00]),
  CHAR_B: new Buffer([
  	0x1B,
  	0x4D,
  	0x01]),
  CHAR_C: new Buffer([
  	0x1B,
  	0x4D,
  	0x02]),
  DOUBLE_STRIKE_ON: new Buffer([
  	0x1B,
  	0x47,
  	0x01]),
  DOUBLE_STRIKE_OFF: new Buffer([
  	0x1B,
  	0x47,
  	0x02]),
  CUT_PAPER: new Buffer([
  	0x0A,
  	0x0A,
  	0x0A,
  	0x0A,
  	// cut paper
  	0x1D,
  	0x56,
  	0x41,
  	0x00]),
  CLEAR_BUFFER: new Buffer([
    0x10,
    0x14,
    0x08])
};

var printer_list = [];
var printer_lookup_count = 0;

function lookup() {

	var _address = '192.168.1.';
	printer_lookup_count = 0;

	console.log('Searching printers...');

	for (var i = FIRST_PRINTER_ADDRESS; i < LAST_PRINTER_ADDRESS + 1; i++) {
		check_printer(_address + i, 9100, cb);
	}

	var _timeout = setTimeout(function(){

		if (printer_lookup_count == LAST_PRINTER_ADDRESS - FIRST_PRINTER_ADDRESS + 1) {
			console.log('Printers discovered');
			for (e in printer_list) {
				console.log(printer_list[e]);
			}
		} else {
			console.log('Time out! Not all the hosts replied in time');
		}

		printer_lookup_count = 0;

		clearTimeout(_timeout);
	}, DEFAULT_PRINTERS_LOOKUP_TIMEOUT);

  return printer_list;
}

var cb = function(socket, host, result) {
	//console.log(host + ': ' + result);
	++printer_lookup_count;

	if (result == 'success' && printer_list.indexOf(host) == -1) {
		printer_list.push(host);
	}

	socket.end();
}

var check_printer = function(host, port, _callback) {

	var sock = net.createConnection(port, host);

	sock.setTimeout(DEFAULT_PRINTER_TIMEOUT)
	.on('connect', function(err) {
		_callback(sock, host, 'success');
	}).on('error', function(err) {
	 	_callback(sock, host, 'failure');
	}).on('timeout', function(err) {
		_callback(sock, host, 'failure');
	}).on('end', function(err) {
		sock.destroy();
	});
}

/** formatText
 *
 * @param list [{
 * 		name:string,
 * 		price:number,
 * 		add:string[],
 * 		remove:string[]
 * 	}]
 * @return text:string (the formatted text ready to print)
 */
function formatText(list) {
	var n_items = list.length;

	var text = commands.NEW_LINE;

  // each object in the array
	for (var i = 0; i < n_items; i++) {

		var line = '';
		var item = list[i];
		var item_length = list[i].name.length;

		var max_char = item.price < 10 ? commands.DEFAULT_MAX_CHAR + 1 : commands.DEFAULT_MAX_CHAR;

		if (item_length <= max_char) {
			line += item.name
				+ utils.spaces (max_char - item_length + commands.N_SPACES)
				+ utils.formatNumber(item.price);
		} else {

			var array = item.name.split(' ');

			var count = 0;

			while (array.length > 0) {

				var first_line = count <= 0;

				var line1 = '';
				line1 = first_line ? line1 : line1 + utils.spaces(commands.DEFAULT_RETURN);

				var j = 0;
				while (j < array.length && line1.length + array[j].length <= max_char) {
					line1 += array[j] + ' ';
					j++;
				}

				if ((!first_line && line1.length == commands.DEFAULT_RETURN && array[j].length + line1.length > max_char)
					|| (first_line && line1.length == 0 && array[j].length > max_char)) {

					var range = max_char - line1.length;
					var k = 0;
					var remaining_word_part = '';

					for (; k < range - 1; k++) {
						line1 += (array[j])[k];
					}

					line1 += '-';

					for (; k < array[j].length; k++) {
						remaining_word_part += (array[j])[k];
					}

					array[j] = remaining_word_part;
				}

				if (first_line) {
					line1 += utils.spaces(max_char - line1.length + commands.N_SPACES)
						+ utils.formatNumber(item.price)
						+ commands.NEW_LINE;
				} else {
					line1 += utils.spaces(commands.LINE_N_CHAR - line1.length)
						+ commands.NEW_LINE;
				}

				array.splice(0, j);
				line += line1;

				count++;
			}
		}

		text += line;

		for (var a in item.add) {
			text += utils.spaces(commands.DEFAULT_ADD_REM_RETURN)
				+ '+ '
				+ item.add[a]
				+ utils.spaces(commands.LINE_N_CHAR - item.add[a].length - 2 - commands.DEFAULT_ADD_REM_RETURN)
				+ commands.NEW_LINE;
		}

		for (var r in item.remove) {
			text += utils.spaces(commands.DEFAULT_ADD_REM_RETURN)
				+ '- '
				+ item.remove[r]
				+ utils.spaces(commands.LINE_N_CHAR - item.remove[r].length - 2 - commands.DEFAULT_ADD_REM_RETURN)
				+ commands.NEW_LINE;
		}

		text += commands.NEW_LINE;
	}

	return text;
}

module.exports = {
  lookup: lookup,
  formatText: formatText,
  commands: commands
};
