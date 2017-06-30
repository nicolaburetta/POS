var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var query = 'SELECT d.id as drink_id,'
    + 'd.name as drink_name,'
    + 'd.price as drink_price'
    + ' FROM drinks d ';

  var connection = mysql.createConnection(db_conn);
  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });

  connection.end();
});

module.exports = router;
