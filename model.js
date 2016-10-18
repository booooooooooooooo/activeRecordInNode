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
};

Record.prototype.delete = function(name, cb){
  connection.query( 'DELETE FROM ' + this.tableName + ' WHERE name = ?', name,
  function (err, result) {
    if (err) throw err;
    cb(result);
  } );
};

Record.prototype.update = function(animal, cb){
  var sentence = '';
  sentence = sentence + ' UPDATE ' + this.tableName + ' SET ' ;
  var count = 0;
  for(var key in animal){
    // console.log(key);
    if(key === 'name') ;
    else if(count === 0){
      sentence = sentence + ' ' + key + ' ' + '=' + ' ' +  '?';
      count = 1;
    }
    else sentence = sentence + ',' + ' ' + key + ' ' + '=' + ' ?';
  }
  sentence = sentence + ' ' + 'where' + ' ' + 'name' + ' ' + '=' + '? ';
  // console.log("sentence is \n");
  // console.log(sentence);

  var data = [];
  for(var key in animal){
    // console.log(animal[key]);
    if( key === 'name') ;
    else data.push(animal[key]);
  }
  data.push(animal['name']);
  // console.log("data is \n");
  // console.log(data);

  connection.query(
    sentence,
    data,
    function (err, result) {
      if (err) throw err;
      cb(result);
    }
  );
}

module.exports.Record = Record;
module.exports.connection = connection;
