var closureModel = function(){
  /**
   *  Constructor
   */
  function Model(tableName) {
    this.tableName = tableName;
  }

  /**
   * Get the whole table. For test purpose.
   */
  Model.prototype.findAll = function(cb, connection) {
    connection.query('SELECT * from ' + this.tableName , function(err, res) {
      if (err)  throw err;
      cb(res);
    });
  };

  /**
   * Find Models that satisfy conditin.
   * @condition = {propKey1 : value1, propKey2 : value2, ...}
   */
  Model.prototype.find = function(condition, cb, connection) {
    var querySentence = 'SELECT * from '  + this.tableName  + ' where ';
    var count = 0;
    for(var key in condition){
        if(count === 0){
           querySentence = querySentence + ' ' + key +  ' ' + '=' + ' ' + '\'' + condition[key]  + '\'' +' ';

          count = 1;
        }
        else{
          querySentence = querySentence + ' and ' +' ' + key + ' ' + '=' + ' ' + '\'' + condition[key] + '\'' +' ';
        }
    }
    connection.query(querySentence, function(err, res, fields) {
      if (err) throw err;
      cb(res);
    });
  };

  /**
   * Insert a new Model to database.
   * @data = {propKey1 : value1, propKey2 : value2, ...}.
   * Exept primary key, which is an unique ID automately generated, each propKey must be indicated in json.
   */
  Model.prototype.insert = function(data, cb, connection){//TODO: !! How to synchronize multiple insertion?
    var that = this;//TODO: ?? How to systematically solve such scope problem?
    var cb1 = function(largestID){
      data['id'] =  largestID + 1;
      connection.query('INSERT INTO ' + that.tableName + ' SET ?', data, function(err,res){
        if(err) throw err;
        cb(res);
      });
    };
    this.getLagestID(cb1, connection);

  };


  /**
   *  Delete items with given properties.
   *  @condition = {propKey1 : value1, propKey2 : value2, ...}
   */
  Model.prototype.delete = function(condition, cb, connection){
    //TODO: condition is only {}, and change name to condition
    var len = condition.length;
    for (var i = 0; i < len; i++) {
      querySentence = ' DELETE  FROM ' + this.tableName + ' WHERE ' ;
      var count = 0;
      for(var key in condition[i]){
          if(count === 0){
            querySentence = querySentence + ' ' + key + ' ' + '=' + ' ' + '\''+  condition[i][key] + '\'' + ' ';
            count = 1;
          }
          else querySentence = querySentence + ' ' + 'and' + ' ' + key + ' ' + '=' + ' '+ '\'' +  condition[i][key] + '\''+ ' ';
      }
      connection.query( querySentence, function (err, res) {
        if (err) throw err;
        cb(res);
      });
    }
  };

  /**
   *  Update target Model.
   *  @id is for locating Model.
   *  @modify = {propKey1 : value1, propKey2 : value2, ...}
   */
  Model.prototype.update = function(id, modify, cb, connection){
    //TODO: change id to condition??
    var querySentence = '';
    querySentence = querySentence + ' UPDATE ' + this.tableName + ' SET ' ;
    var count = 0;
    for(var key in modify){
      if(count === 0){
        querySentence = querySentence + ' ' + key + ' ' + '=' + ' ' +  '?';
        count = 1;
      }
      else querySentence = querySentence + ',' + ' ' + key + ' ' + '=' + ' ?';
    }
    querySentence = querySentence + ' ' + 'where' + ' ' + 'id' + ' ' + '=' + '? ';


    var data = [];
    for(var key in modify){
      data.push(modify[key]);
    }
    data.push(id);

    connection.query( querySentence, data, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  }

  /**
   *  Get scheme information of table.
   */
  Model.prototype.getScheme = function(cb, connection){
    connection.query( "DESCRIBE " + this.tableName, function(err, res){
      if (err) throw err;
      cb(res);
    } );
  };

  Model.prototype.getLagestID = function(cb, connection){
    connection.query("select id from " + this.tableName + " order by id desc limit 1", function(err, res){
      if(res.length == 0) cb(-1);
      else cb(res[0].id);
    } );

  }

  return Model;
}();






module.exports = closureModel;
