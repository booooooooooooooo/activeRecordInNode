var model = require("./model.js");


var Item = model.Item;
var connection = model.connection;




var pet = new Item('pet');
pet.selectAll(function(result){console.log('The result is: \n', result);})

connection.end();
