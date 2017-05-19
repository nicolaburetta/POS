var express = require('express');
var query = require('../db/database');
var setupPrinter = require('../models/printer_model.js');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

  var printer = setupPrinter(
    '192.168.1.123',
    9100,
    80,
    "PROGETTO GIOVANI SARCEDO",
    "via T. Vecellio, Sarcedo (VI)"
  );

  var typeid = req.param.typeid;
  query('SELECT * FROM dishes WHERE id_type=' + typeid, printer, res);

});

module.exports = router;
