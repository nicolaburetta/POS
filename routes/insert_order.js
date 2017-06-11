var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

const setupPrinter = require('../client/src/models/printer_model');

/* GET home page. */
router.post('/', function(req, res, next) {
  const order = req.body;

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
      var quantities = [];
      for (i in order) {
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
      }
      console.log('Query insert data: ', data);

      connection.query(order_dishes_query, [data], function(err, rows, fields) {
        if (err) throw err;

        try {
          var printer1 = setupPrinter('192.168.1.123', 9100, 80, 'Progetto Giovani Sarcedo', 'Parco Anfiteatro, via T. Vecellio');
          printer1.print(order);
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
