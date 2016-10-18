var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '11235813',
  database : 'testDb'
});

connection.connect();



function Record(tableName) {
  this.tableName = tableName;
}
Record.prototype.selectAll = function(cb) {
  connection.query('SELECT * from ' + this.tableName , function(err, rows, fields) {
    if (err)  throw err;
    cb(rows);
  });
};

Record.prototype.findBy = function(name, cb) {
  connection.query('SELECT * from ' + this.tableName + ' where name = ' + '\'' + name + '\'', function(err, rows, fields) {
    if (err) throw err;
    cb(rows);
  });
};

Record.prototype.insert = function(dog, cb){
  connection.query('INSERT INTO ' + this.tableName + ' SET ?', dog, function(err,res){
    if(err) throw err;
    cb(res);
  });
};

Record.prototype.getScheme = function(cb){
  connection.query( "DESCRIBE " + this.tableName, function(err, rows, fields){
    if (err) throw err;
    cb(rows);
  } );

}

module.exports.Record = Record;
module.exports.connection = connection;
