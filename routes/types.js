var express = require('express');
var query = require('../db/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  query('SELECT * FROM dishes_types', res);

});

module.exports = router;
