var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var connection = mysql.createConnection(db_conn);

  connection.connect();

  connection.query('SELECT * FROM dishes_types', function(err, rows, fields) {
    if (err) throw err;
    // print here
    res.json(rows);
  });

  connection.end();
});

module.exports = router;
