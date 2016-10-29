var connection = require("./connection.js");



var createTable = require("./migration.js").createTable;
var deleteTable = require("./migration.js").deleteTable;
deleteTable('customers', function(result){console.log('\n****Table deleted! \n', result);}, connection);
createTable('customers', {'id': 'int', 'name' : 'VARCHAR(100)', 'age' : 'int', 'gender' : 'VARCHAR(100)'}, function(result){console.log('\n****Table created!\n', result);}, connection);

var Model = require("./model.js");
var customer = new Model('customers');
customer.insert({'name' : 'bo', 'age' : 90, 'gender' : 'f'}, function(result){console.log('\n****insert result is: \n', result);}, connection);

// customer.insert({'name' : 'tong', 'age' : 88, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'civic', 'age' : 15, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'nexus', 'age' : 16, 'gender' : 'f'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'mac', 'age' : 14, 'gender' : 'f'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'giant', 'age' : 10, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
