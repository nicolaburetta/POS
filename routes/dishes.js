var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var type_id = req.query.typeid;
  var query = 'SELECT d.id as dish_id,'
    + 'd.name as dish_name,'
    + 'd.price as dish_price,'
    + 'dt.id as type_id,'
    + 'dt.name as type_name'
    + ' FROM dishes d, dishes_types dt WHERE d.id_type=dt.id ';
  query += typeof type_id == 'undefined' ? '' : 'AND id_type=' + type_id;

  var connection = mysql.createConnection(db_conn);
  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });

  connection.end();
});

module.exports = router;
