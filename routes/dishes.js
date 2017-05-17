var express = require('express');
var query = require('../db/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var typeid = req.query.typeid;
  query('SELECT * FROM dishes WHERE id_type=' + typeid, res);

});

module.exports = router;
