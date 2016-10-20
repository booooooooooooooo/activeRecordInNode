var connection = require("./connection.js");
connection.connect();


/**
 * Create new table in database.
 * property = {propertyName : type, propertyName : type,...}
 */
var createTable = function(tableName, property, cb){
  var sentence = 'CREATE TABLE' + ' ' + tableName + ' ';
  sentence = sentence + '(' + ' ';
  //TODO: finish creating table.
  connection.query('CREATE TABLE TerStops ( Stop_id int,
                Stop_name VARCHAR(100),
                Stop_lat VARCHAR(100),
                Stop_lon VARCHAR(100),
                PRIMARY KEY(Stop_id))', function(err, result){
                    if(err) {
                        console.log(err);
                    }
                    else{
                        console.log("Table Ter_Stops Created");
                    }
                });
}

/**
 * Delete table from database.
 */
var deleteTable = function(tableName, cb){
  //TODO
}

module.exports.createTable = createTable;
module.exports.deleteTable = deleteTable;
module.exports.connection = connection;
