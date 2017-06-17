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
							client.write(commands.BOLD_ON);
							client.write(commands.TEXT_DOUBLE_WIDTH);
							client.write(commands.UNDERL_1_ON);
							client.write(commands.JUST_CENTER);
							client.write(commands.NEW_LINE);
							client.write('ORDINE ' + idOrder);
							client.write(commands.UNDERL_OFF);
							client.write(commands.BOLD_OFF);
							client.write(commands.TEXT_NORMAL);
						} else {

							client.write(_owner);
							client.write(commands.NEW_LINE);
							client.write(commands.NEW_LINE);

							// kitchen text
							var text_temp = text
								.replace(/10 x/g, 'num_dieci x')
								.replace(/11 x/g, 'num_undici x')
								.replace(/12 x/g, 'num_dodici x')
								.replace(/13 x/g, 'num_tredici x')
								.replace(/14 x/g, 'num_quattordici x')
								.replace(/15 x/g, 'num_quindici x')
								.replace(/16 x/g, 'num_sedici x')
								.replace(/17 x/g, 'num_diciassette x')
								.replace(/18 x/g, 'num_diciotto x')
								.replace(/19 x/g, 'num_diciannove x')
								.replace(/20 x/g, 'num_venti x')
								.replace(/2 x/g, 'num_due x')
								.replace(/3 x/g, 'num_tre x')
								.replace(/4 x/g, 'num_quattro x')
								.replace(/5 x/g, 'num_cinque x')
								.replace(/6 x/g, 'num_sei x')
								.replace(/7 x/g, 'num_sette x')
								.replace(/8 x/g, 'num_otto x')
								.replace(/9 x/g, 'num_nove x');

							var text_kitchen = text_temp
								.replace(/0/g, ' ')
								.replace(/1/g, ' ')
								.replace(/2/g, ' ')
								.replace(/3/g, ' ')
								.replace(/4/g, ' ')
								.replace(/5/g, ' ')
								.replace(/6/g, ' ')
								.replace(/7/g, ' ')
								.replace(/8/g, ' ')
								.replace(/9/g, ' ')
								.replace(/,/g, ' ')
								.replace('TOTALE', '      ')
								.replace(/num_dieci x/g, '10 x')
								.replace(/num_undici x/g, '11 x')
								.replace(/num_dodici x/g, '12 x')
								.replace(/num_tredici x/g, '13 x')
								.replace(/num_quattordici x/g, '14 x')
								.replace(/num_quindici x/g, '15 x')
								.replace(/num_sedici x/g, '16 x')
								.replace(/num_diciassette x/g, '17 x')
								.replace(/num_diciotto x/g, '18 x')
								.replace(/num_diciannove x/g, '19 x')
								.replace(/num_venti x/g, '20 x')
								.replace(/num_due x/g, '2 x')
								.replace(/num_tre x/g, '3 x')
								.replace(/num_quattro x/g, '4 x')
								.replace(/num_cinque x/g, '5 x')
								.replace(/num_sei x/g, '6 x')
								.replace(/num_sette x/g, '7 x')
								.replace(/num_otto x/g, '8 x')
								.replace(/num_nove x/g, '9 x');

							console.log(text_kitchen);

							// order ID
							client.write(commands.TEXT_DOUBLE_WIDTH);
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
