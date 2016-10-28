//TODO: why proxy cannot trap findAll?????????
var Model = require("./model.js");


function readOnlyHandlerMaker(obj) {
  return {
    findAll:       function(cb, connection) {
      console.log("Succeed!" );
      obj.findAll(cb, connection);
    },
    find:          function(condition, cb, connection) {
      console.log("Succeed!" );
      // obj.find(condition, cb, connection);
    },
    insert:       function() {
      console.log("Failed: Unauthorized action!" );
    },
    delete:          function() {
      console.log("Failed: Unauthorized action!" );
    },
    update:          function() {
      console.log("Failed: Unauthorized action!" );
    }
  };
}


var proxyMaker = function(tableName){
  var model = new Model(tableName);
  var handler = readOnlyHandlerMaker(model);
  var proxy = new Proxy(model, handler);
  // console.log(Object.getPrototypeOf(model));
  // console.log(Object.getPrototypeOf(handler));
  // console.log(Object.getPrototypeOf(proxy));
  //
  // console.log(model);
  // console.log(handler);
  // console.log(proxy);
  //
  // console.log(model.findAll);
  // console.log(handler.findAll);
  // console.log(proxy.findAll);
  return proxy;
};

module.exports = proxyMaker;
