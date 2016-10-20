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
 * @condition = {propertyName : value, propertyName : value,...}
 */
Record.prototype.find = function(condition, cb, connection) {
  var sentence = 'SELECT * from '  + this.tableName  + ' where ';
  var count = 0;
  for(var key in condition){
      if(count === 0){
         sentence = sentence + ' ' + key +  ' ' + '=' + ' ' + '\'' + condition[key]  + '\'' +' ';

        count = 1;
      }
      else{
        sentence = sentence + ' and ' +' ' + key + ' ' + '=' + ' ' + '\'' + condition[key] + '\'' +' ';
      }
  }
  //TODO: join table
  connection.query(sentence, function(err, rows, fields) {
    if (err) throw err;
    cb(rows);
  });
};

/**
 * Insert a new record to database.
 * @data = [{}, {}, {},...]. Each {} contains all property except id.
 */
Record.prototype.insert = function(data, cb, connection){
  var len = data.length;
  for (var i = 0; i < len; i++) {
      //TODO: replace id with serial number.
      var id = 0;
      data[i]['id'] = 0;
      connection.query('INSERT INTO ' + this.tableName + ' SET ?', data[i], function(err,res){
        if(err) throw err;
        cb(res);
      });
  }
};


/**
 *  data = [{}, {}, {},...].
 */
Record.prototype.delete = function(data, cb, connection){
  var len = data.length;
  for (var i = 0; i < len; i++) {
    sentence = ' DELETE  FROM ' + this.tableName + ' WHERE ' ;
    var count = 0;
    for(var key in data[i]){
        if(count === 0){
          sentence = sentence + ' ' + key + ' ' + '=' + ' ' + '\''+  data[i][key] + '\'' + ' ';
          count = 1;
        }
        else sentence = sentence + ' ' + 'and' + ' ' + key + ' ' + '=' + ' '+ '\'' +  data[i][key] + '\''+ ' ';
    }
    // console.log(sentence);
    connection.query( sentence, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

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
