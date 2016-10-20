var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '11235813',
  database : 'testDb'
});


module.exports = connection;
