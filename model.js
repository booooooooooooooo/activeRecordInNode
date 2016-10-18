var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '11235813',
  database : 'testDb'
});

connection.connect();



function Item(tableName) {
  this.tableName = tableName;
}
Item.prototype.selectAll = function(cb) {
  connection.query('SELECT * from ' + this.tableName, function(err, rows, fields) {
    if (err) reject(err);
    cb(rows);
  });
};

module.exports.Item = Item;
module.exports.connection = connection;
