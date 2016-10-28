var Model = require("./model.js");


function readOnlyHandlerMaker(obj) {
  return {
    get : function(target, propKey, receiver){
      if(propKey === 'tableName'){
        console.log("Succeeded : Get table Name!" );
        return obj.tableName;
      }else if(propKey === 'findAll'){
        console.log("Succeeded : Find All!" );
        return obj.findAll;
      }else if(propKey === 'find'){
        console.log("Succeeded : Find by condition!" );
        return obj.find;
      }else if(propKey === 'insert' || propKey === 'delete' || propKey == 'update'){
        console.log("Failed! No authorization!");
        return function(){};
      }else{
        throw new Error('No such operation!');
      }
    }
  };
}


var proxyMaker = function(tableName){
  var model = new Model(tableName);
  var handler = readOnlyHandlerMaker(model);
  var proxy = new Proxy(model, handler);
  return proxy;
};

module.exports = proxyMaker;
