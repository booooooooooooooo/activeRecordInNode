var connection = require("./connection.js");
connection.connect();

var createTable = require("./migration.js").createTable;
var deleteTable = require("./migration.js").deleteTable;
deleteTable('customers', function(result){console.log('\n****Table deleted! \n', result);}, connection);
createTable('customers', {'id': 'int', 'name' : 'VARCHAR(100)', 'age' : 'int', 'gender' : 'VARCHAR(100)'}, function(result){console.log('\n****Table created!\n', result);}, connection);

var Model = require("./model.js");
var customer = new Model('customers', {'belongs_to' : null, 'has_many' : null});
customer.insert([{'name' : 'bo', 'age' : 90, 'gender' : 'f'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert([{'name' : 'tong', 'age' : 88, 'gender' : 'm'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert([{'name' : 'civic', 'age' : 15, 'gender' : 'm'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert([{'name' : 'nexus', 'age' : 16, 'gender' : 'f'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert([{'name' : 'mac', 'age' : 14, 'gender' : 'f'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert([{'name' : 'giant', 'age' : 10, 'gender' : 'm'}], function(result){console.log('\n****insert result is: \n', result);}, connection);







// customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
// customer.find({'name' : 'bo', 'age' : 88, 'gender' : 'f'}, function(result){console.log('\n****find result is: \n', result);}, connection);
// customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
// customer.update(0, {'name' : 'tong', 'gender' : 'm'}, function(result){console.log('\n****update result is: \n', result);}, connection);
// customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
// customer.delete([{'name' : 'bo', 'age' : 88, 'gender' : 'f'}], function(result){console.log('\n****delete result is: \n', result);}, connection);
// customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
connection.end();
