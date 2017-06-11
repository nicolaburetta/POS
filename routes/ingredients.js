var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var connection = mysql.createConnection(db_conn);

  var dish_id = req.query.dishid;
  var query = 'SELECT i.id as id,i.name as name FROM ingredients i';
  query += typeof dish_id == 'undefined' ? '' : ',dishes_ingredients di '
    + 'WHERE di.id_ing=i.id AND di.id_dish=' + dish_id;

  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    // print here
    res.json(rows);
  });

  connection.end();
});

module.exports = router;
