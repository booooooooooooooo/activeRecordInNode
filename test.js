var connection = require("./connection.js");
connection.connect();


var createTable = require("./migration.js").createTable;
var deleteTable = require("./migration.js").deleteTable;
deleteTable('customers', function(result){console.log('\n****Table deleted! \n', result);}, connection);
createTable('customers', {'id': 'int', 'name' : 'VARCHAR(100)', 'age' : 'int', 'gender' : 'VARCHAR(100)'}, function(result){console.log('\n****Table created!\n', result);}, connection);


var Record = require("./model.js").Record;
var customer = new Record('customers', {'belongs_to' : null, 'has_many' : null});
customer.insert([{'name' : 'bo', 'age' : 88, 'gender' : 'f'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
customer.find({'name' : 'bo', 'age' : 88, 'gender' : 'f'}, function(result){console.log('\n****find result is: \n', result);}, connection);
customer.delete([{'name' : 'bo', 'age' : 88, 'gender' : 'f'}], function(result){console.log('\n****delete result is: \n', result);}, connection);
customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);

customer.getScheme(function(result){console.log('\n****scheme is: \n', result);}, connection);

connection.end();
