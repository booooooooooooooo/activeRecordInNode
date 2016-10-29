var connection = require("./connection.js");


var Model = require("./model.js");


var customer = new Model('customers');
customer.findAll(function(result){console.log("Get whole table") ; console.log(result); }, connection);
// customer.insert({'name' : 'tong', 'age' : 88, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'civic', 'age' : 15, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'nexus', 'age' : 16, 'gender' : 'f'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'mac', 'age' : 14, 'gender' : 'f'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
// customer.insert({'name' : 'giant', 'age' : 10, 'gender' : 'm'}, function(result){console.log('\n****insert result is: \n', result);}, connection);
