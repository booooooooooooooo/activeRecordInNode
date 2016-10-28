var connection = require("./connection.js");
connection.connect();

// !!!! In practice, proxy is NOT by third pary itself !!!
// It can be issued either through rewriting work done by first party code,
// OR by calling some API of first party code.
var proxyMaker = require("./proxyMaker");


var customer = proxyMaker('customers');
customer.findAll(function(result){console.log('\n****findAll result is: \n', result);}, connection);
customer.find({'name' : 'bo', 'age' : 88, 'gender' : 'f'}, function(result){console.log('\n****find result is: \n', result);}, connection);
customer.insert([{'name' : 'foreigner', 'age' : 16, 'gender' : 'f'}], function(result){console.log('\n****insert result is: \n', result);}, connection);
customer.update(0, {'name' : 'foreigner', 'gender' : 'm'}, function(result){console.log('\n****update result is: \n', result);}, connection);
customer.delete([{'name' : 'bo', 'age' : 88, 'gender' : 'f'}], function(result){console.log('\n****delete result is: \n', result);}, connection);
customer.bike(); // No such operation error case.


connection.end();
