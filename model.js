/**
 *  Constructor
 */
function Record(tableName, association) {
  this.tableName = tableName;
  this.belongs_to = association['belongs_to'];
  this.has_many = association['has_many'];
}

/**
 * Get the whole table. For test purpose.
 */
Record.prototype.findAll = function(cb, connection) {
  connection.query('SELECT * from ' + this.tableName , function(err, rows, fields) {
    if (err)  throw err;
    cb(rows);
  });
};

/**
 * Find records that satisfy conditin.
 * @condition = {propertyName : value, propertyName : value,...}
 */
Record.prototype.find = function(condition, cb, connection) {
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
  //TODO: join table
  connection.query(querySentence, function(err, rows, fields) {
    if (err) throw err;
    cb(rows);
  });
};

/**
 * Insert a new record to database.
 * @data = [{}, {}, {},...]. Each {} contains all property except id.
 */
Record.prototype.insert = function(data, cb, connection){
  var len = data.length;
  for (var i = 0; i < len; i++) {
      //TODO: replace id with serial number.
      var id = 0;
      data[i]['id'] = 0;
      connection.query('INSERT INTO ' + this.tableName + ' SET ?', data[i], function(err,res){
        if(err) throw err;
        cb(res);
      });
  }
};


/**
 *  Delete records with given properties.
 *  @data = [{}, {}, {},...].
 */
Record.prototype.delete = function(data, cb, connection){
  var len = data.length;
  for (var i = 0; i < len; i++) {
    querySentence = ' DELETE  FROM ' + this.tableName + ' WHERE ' ;
    var count = 0;
    for(var key in data[i]){
        if(count === 0){
          querySentence = querySentence + ' ' + key + ' ' + '=' + ' ' + '\''+  data[i][key] + '\'' + ' ';
          count = 1;
        }
        else querySentence = querySentence + ' ' + 'and' + ' ' + key + ' ' + '=' + ' '+ '\'' +  data[i][key] + '\''+ ' ';
    }
    connection.query( querySentence, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

/**
 *  Update target record.
 *  @id is for locating record.
 *  @modify = {} which contains the data to be modified of located record.
 */
Record.prototype.update = function(id, modify, cb, connection){
  //TODO: locate and modify records.
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
  console.log("querySentence is \n");
  console.log(querySentence);

  var data = [];
  for(var key in modify){
    data.push(modify[key]);
  }
  data.push(id);
  console.log("data is \n");
  console.log(data);

  connection.query( querySentence, data, function (err, result) {
    if (err) throw err;
    cb(result);
  });
}


/**
 *  Get scheme information of table.
 */
Record.prototype.getScheme = function(cb, connection){
  connection.query( "DESCRIBE " + this.tableName, function(err, rows, fields){
    if (err) throw err;
    cb(rows);
  } );
};


module.exports.Record = Record;
