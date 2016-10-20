/**
 *  Constructor
 */
function Record(tableName, association) {
  this.tableName = tableName;
  this.belongs_to = association['belongs_to'];
  this.has_many = association['has_many'];
}

/**
 * Get the whole table. For test purpose.
 */
Record.prototype.findAll = function(cb, connection) {
  connection.query('SELECT * from ' + this.tableName , function(err, rows, fields) {
    if (err)  throw err;
    cb(rows);
  });
};

/**
 * condition = {}
 */
Record.prototype.find = function(condition, cb, connection) {
  var connection = require("./connection.js");
  connection.connect();
  //TODO: join table
  connection.query('SELECT * from ' + this.tableName + ' where name = ' + '\'' + name + '\'', function(err, rows, fields) {
    if (err) throw err;
    cb(rows);
  });
  connection.end();
};

// /**
//  *  data = [{}, {}, {},...]
//  */
// Record.prototype.insert = function(data, cb, connection){
//   //TODO: insert all data, at the same time, add primary id.
// var connection = require("./connection.js");
// connection.connect();
//   connection.query('INSERT INTO ' + this.tableName + ' SET ?', dog, function(err,res){
//     if(err) throw err;
//     cb(res);
//   });
//   connection.end();
// };
//
//
// /**
//  *  data = [{}, {}, {},...].
//  */
// Record.prototype.delete = function(data, cb, connection){
// var connection = require("./connection.js");
// connection.connect();
//   //TODO: delete all records that satisfy requirement.
//   connection.query( 'DELETE FROM ' + this.tableName + ' WHERE name = ?', name,
//   function (err, result) {
//     if (err) throw err;
//     cb(result);
//   } );
//   connection.end();
// };
//
// /**
//  *  condition = {}, which contains the attributes to locate records.
//  *  modify = {} which contains the data to be modified of located records.
//  */
// Record.prototype.update = function(condition, modify, cb, connection){
// var connection = require("./connection.js");
// connection.connect();
//   //TODO: locate and modify records.
//   var sentence = '';
//   sentence = sentence + ' UPDATE ' + this.tableName + ' SET ' ;
//   var count = 0;
//   for(var key in animal){
//     // console.log(key);
//     if(key === 'name') ;
//     else if(count === 0){
//       sentence = sentence + ' ' + key + ' ' + '=' + ' ' +  '?';
//       count = 1;
//     }
//     else sentence = sentence + ',' + ' ' + key + ' ' + '=' + ' ?';
//   }
//   sentence = sentence + ' ' + 'where' + ' ' + 'name' + ' ' + '=' + '? ';
//   // console.log("sentence is \n");
//   // console.log(sentence);
//
//   var data = [];
//   for(var key in animal){
//     // console.log(animal[key]);
//     if( key === 'name') ;
//     else data.push(animal[key]);
//   }
//   data.push(animal['name']);
//   // console.log("data is \n");
//   // console.log(data);
//
//   connection.query(
//     sentence,
//     data,
//     function (err, result) {
//       if (err) throw err;
//       cb(result);
//     }
//   );
//   connection.end();
// }
//
//
// /**
//  *  Get scheme information of table.
//  */
// Record.prototype.getScheme = function(cb, connection){
// var connection = require("./connection.js");
// connection.connect();
//   connection.query( "DESCRIBE " + this.tableName, function(err, rows, fields){
//     if (err) throw err;
//     cb(rows);
//   } );
//   connection.end();
// };


module.exports.Record = Record;
