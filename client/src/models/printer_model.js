var net = require('net-socket');
var utils = require('../utils/utils.js');
var printer_utils = require('../utils/printer_utils.js');

const commands = printer_utils.commands;

function setupPrinter(_host, _port, _type, _owner, _location) {
	if (utils.isIpAddress(_host)
			&& utils.isInt(_port)
			&& utils.isInt(_type)
			&& utils.isString(_owner)
			&& utils.isString(_location)) {
		return {
			host: _host,
			port: _port,
			type: _type,
			owner: _owner,
			location: _location,
			print: function(orderList, idOrder, kitchen) {
				if (utils.isOrderItemArray(orderList)) {
				  var client = new net.connect(_port, _host);
				  client.on('connect', function() {
						console.log(_host + ' connected');

				    var text = printer_utils.formatText(orderList, false);

				    client.write(commands.INITIALIZE);
				    client.write(commands.CHAR_A);

				    // LOGO
				    // client.write(logo);

					  // INFO
					  client.write(commands.JUST_CENTER);
					  client.write(commands.NEW_LINE);

						if (!kitchen) {
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

							// ID order
							client.write(commands.TEXT_DOUBLE_WIDTH);
							client.write(commands.TEXT_DOUBLE_HEIGHT);
							client.write(commands.BOLD_ON);
							client.write(commands.UNDERL_1_ON);
							client.write(commands.JUST_CENTER);
							client.write(commands.NEW_LINE);
							client.write('ORDINE ' + idOrder);
							client.write(commands.UNDERL_OFF);
							client.write(commands.BOLD_OFF);
							client.write(commands.TEXT_NORMAL);
						} else {

							// kitchen text
							var text_kitchen = text;
							for (var i = 1; i < 10; i++) {
								text_kitchen.replace(String(i), utils.spaces(1));
							}
							text_kitchen.replace(',', utils.spaces(1));
							text_kitchen.replace('TOTALE', utils.spaces(6));

							// order ID
							client.write(commands.TEXT_DOUBLE_WIDTH);
							client.write(commands.TEXT_DOUBLE_HEIGHT);
							client.write(commands.BOLD_ON);
							client.write(commands.UNDERL_1_ON);
							client.write('ORDINE ' + idOrder);
					    client.write(commands.NEW_LINE);
					    client.write(commands.NEW_LINE);

							// PRODUCTS
							client.write(commands.JUST_LEFT);
					    client.write(text_kitchen);
					    client.write(commands.NEW_LINE);
						}

				    // CUT paper
				    client.write(commands.CUT_PAPER);

				    // END
						client.write(commands.CLEAR_BUFFER);

				    client.destroy(_host + ': end print');
				  });

					client.on('error', function(err) {
						console.log(_host + ' ERROR:\n' + err);
					});

					client.on('timeout', function() {
						console.log(_host + ' timeout. The connection will be closed');
						client.destroy();
					});

					client.on('data', function(data) {
						console.log(_host + ' response: ' + data);
					});

					client.on('end', function() {
						console.log(_host + ': connection closed');
					});
				}
				return false;
			}
		};
	}
	return false;
}

module.exports = setupPrinter;
