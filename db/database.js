var mysql = require('mysql');

function query(query, printer, response) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    database : 'pos',
    user     : 'user',
    password : '1234'
  });

  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    // print here
    response.json(rows);
  });

  connection.end();
}

module.exports = query;
