var model = require("./model.js");


var Record = model.Record;
var connection = model.connection;




var pet = new Record('pet');

// pet.selectAll(function(result){console.log('The result is: \n', result);});

// pet.findBy('SnowBall', function(result){console.log('The result is: \n', result);});


var dog = {
    name: 'SnowBall',
    owner: 'Bo',
    species: 'Hasky',
    sex: 'm',
    birth: new Date(1999, 3, 30),
    death: null };
// pet.insert(dog, function(result){console.log('The result is: \n', result);});

// pet.getScheme( function(result){console.log('The result is: \n', result);} );

// pet.delete('SnowBall', function(result){console.log('The result is: \n', result);} );

var updateddog = {
    name: 'SnowBall',
    owner: 'Tong',
    species: 'Hasky',
    sex: 'm',
    birth: new Date(1999, 3, 30),
    death: null };
pet.update(updateddog, function(result){console.log('The result is: \n', result);} );
pet.findBy('SnowBall', function(result){console.log('The result is: \n', result);});


connection.end();
