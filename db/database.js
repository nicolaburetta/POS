var mysql = require('mysql');

function query(query, response) {
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
    response.json(rows);
  });

  connection.end();
}

module.exports = query;
