var express = require('express');
var mysql = require('mysql');
var db_conn = require('../db_utils/db_conn');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var type_id = req.query.typeid;
  var query = 'SELECT * FROM dishes ';
  query += typeof type_id == 'undefined' ? '' : 'WHERE id_type=' + type_id;

  var connection = mysql.createConnection(db_conn);
  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });

  connection.end();
});

module.exports = router;
