var net = require('net');
var utils = require('../utils/utils.js');
var printer_utils = require('../utils/printer_utils.js');

const commands = printer_utils.commands;

function setupPrinter(_host, _port, _type, _owner, _location) {
	if (!(utils.isIpAddress(_host) &&
		utils.isInt(_port) &&
		utils.isInt(_type) &&
		utils.isString(_owner) &&
		utils.isString(_location))) return 'invalid';
	return {
		host: _host,
		port: _port,
		type: _type,
		owner: _owner,
		location: _location,
		print: function(order) {
		  var client = new net.Socket();
		  client.connect(this.port, this.host, function() {

		    var text = printer_utils.formatText(order.items);

		    client.write(commands.INITIALIZE);
		    client.write(commands.CHAR_A);

		    // LOGO
		    // client.write(logo);

		    // INFO
		    client.write(commands.JUST_CENTER);

		    client.write(commands.NEW_LINE);
		    client.write(_owner);
		    client.write(commands.NEW_LINE);
		    client.write(_location);
		    client.write(commands.NEW_LINE);
		    client.write(commands.NEW_LINE);

		    // PRODUCTS and PRICES
		    client.write(commands.JUST_LEFT);
		    client.write(text);
		    client.write(commands.NEW_LINE);

		    // CUT paper
		    client.write(commands.CUT_PAPER);

		    // END
			client.write(commands.CLEAR_BUFFER);
		    client.destroy();
		  });
		}
	};
}

module.exports = setupPrinter;
