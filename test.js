// var model = require("./model.js");
// var Record = model.Record;
// var connection1 = model.connection1;


var migration = require("./migration.js");
var createTable = migration.createTable;
var deleteTable = migration.deleteTable;
var connection2 = migration.connection;

// deleteTable('pet', function(result){console.log('The result is: \n', result);});

// createTable('Customer', {'id': 'int', 'name' : 'VARCHAR(100)', 'age' : 'int', 'gender' : 'VARCHAR(100)'}, function(result){console.log('The result is: \n', result);});

// var customer = new Record('customers', {});
// customer.findAll(function(result){console.log('The result is: \n', result);});



//TODO: use pool connection and end all connections.
// connection1.end();
connection2.end();
