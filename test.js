var connection = require("./connection.js");
connection.connect();


var createTable = require("./migration.js").createTable;
var deleteTable = require("./migration.js").deleteTable;
deleteTable('customers', function(result){console.log('The result is: \n', result);}, connection);
createTable('customers', {'id': 'int', 'name' : 'VARCHAR(100)', 'age' : 'int', 'gender' : 'VARCHAR(100)'}, function(result){console.log('The result is: \n', result);}, connection);


var Record = require("./model.js").Record;
var customer = new Record('customers', {'belongs_to' : null, 'has_many' : null});
customer.findAll(function(result){console.log('The result is: \n', result);}, connection);


connection.end();
