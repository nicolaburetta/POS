var express = require('express');
var router = express.Router();

var addresses = require('../client/src/utils/printer_utils').printers_ip;

/* GET home page. */
router.get('/', function(req, res, next) {
  const list = [ 0, 1 ];
  res.send(list);
});

module.exports = router;
