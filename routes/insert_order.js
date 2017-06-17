var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var printers_ip = require('../client/src/utils/printer_utils').printers_ip;
var router = express.Router();

const setupPrinter = require('../client/src/models/printer_model');

/* GET home page. */
router.post('/', function(req, res, next) {
  const order = req.body;
  console.log(order);

  if (typeof order != 'undefined') {

    const order_query = 'INSERT INTO orders values()';
    const order_dishes_query = 'INSERT INTO order_dishes(id_order,id_dish,quantity) VALUES ?';

    var connection = mysql.createConnection(db_conn);
    connection.connect();

    connection.query(order_query, function(err, rows, fields) {
      if (err) throw err;

      const id_order = rows.insertId;
      console.log('ID order: ' + id_order);

      var data = [];
      var kitchen_data_1 = [];
      var kitchen_data_2 = [];
      var kitchen_data_3 = [];
      var quantities = [];
      for (i in order) {
        // create data structure for the query
        var found = false;
        var foundIndex = 0;
        var index = 0;
        while (!found && index < data.length) {
          found = data[index].indexOf(order[i].id) == 1;
          index++;
        }
        if (!found) {
          data.push([
            id_order,
            order[i].id,
            order[i].quantity
          ]);
        } else {
          index--;
          (data[index])[2] += order[i].quantity;
        }

        // create different data structures for the kitchen
        if (order[i].type_id === 5) kitchen_data_1.push(order[i]);
        else if (order[i].type_id === 6) kitchen_data_2.push(order[i]);
        else if (order[i].type_id === 7) kitchen_data_3.push(order[i]);
        console.log('DATA 1: ',kitchen_data_1);
        console.log('DATA 2: ',kitchen_data_2);
        console.log('DATA 3: ',kitchen_data_3);

      }
      console.log('Query insert data: ', data);

      connection.query(order_dishes_query, [data], function(err, rows, fields) {
        if (err) throw err;

        try {
          var printer_cash_register = setupPrinter(printers_ip[0], 9100, 80, 'PROGETTO GIOVANI SARCEDO', 'Parco Anfiteatro, via T. Vecellio');
          var printer_1 = setupPrinter(printers_ip[1], 9100, 80, 'BRUSCHETTA', '');
          var printer_2 = setupPrinter(printers_ip[2], 9100, 80, 'PANINO', '');
          var printer_3 = setupPrinter(printers_ip[4], 9100, 80, 'FRITTO', '');
          printer_cash_register.print(order, id_order, false);
          if (kitchen_data_1.length > 0) { printer_1.print(kitchen_data_1, id_order, true); }
          if (kitchen_data_2.length > 0) { printer_2.print(kitchen_data_2, id_order, true); }
          if (kitchen_data_3.length > 0) { printer_3.print(kitchen_data_3, id_order, true); }
        } catch (exception) {
          console.log(exception);
        }

        res.json({
          type: 'ok',
          desc: 'ordine ricevuto e processato correttamente',
          idOrder: id_order
        });
      });

      connection.end();

    });

  } else {
    res.json({
      type: 'error',
      desc: 'operazione fallita'
    });
  }
});

module.exports = router;
