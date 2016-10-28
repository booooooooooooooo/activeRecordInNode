var Model = require("./model.js");

//TODO: lazy evaluation? constrains are verified before calling function??

//TODO: the scheme used here should be consistent or smaller than the constrains in relational database.
//TODO: Cannot change database schema here. TO change it, call function in migration.js module.

var AssoModel = function(tableName, belongToJson, hasManyJson){
  this.tableName = tableName;
  this.belongs_to = belongToJsonArr;
  this.hasManyArr = hasManyArr; //{t1 : ['delete'], t2 : null, t3 : ['update']}
}

AssoModel.prototype = Model.prototype;


/**
  * @condition = {column1 : value1, colume2 : value2,...}
  * column1 and colume2 are from this.tableName and tables in this.hasManyArr
  */
AssoModel.prototype.assoFind = function(condition, cb, connection){

}

/**
  * @condition = {column1 : value1, colume2 : value2,...}
  * column1 and colume2 are from this.tableName and tables in this.hasManyArr
  * @modify = {columnX : valueX, columnY : valueY, ...}
  * columnX and columnY are all from this.tableName.
  */
AssoModel.prototype.assoUpdate = function(condition, modify, cb, connection){

}

/**
  * @condition = {column1 : value1, colume2 : value2,...}
  * column1 and colume2 are from this.tableName and tables in this.hasManyArr
  */
AssoModel.prototype.assoDelete = function(condition, cb, connection){
  //TODO : get subset of has_many delete_together which only contains tables that has 'delete' option.
  /*
  DELETE w
  FROM this.tableName t1
  INNER JOIN delete_together[i] t2
  ON t1.id= t2.t1_id
  WHERE Company = '1' AND Date = '2013-05-06'
  */

  /*
  ALTER TABLE dbo.T2
   DROP CONSTRAINT FK_T1_T2   -- or whatever it's called

   ALTER TABLE dbo.T2
   ADD CONSTRAINT FK_T1_T2_Cascade
   FOREIGN KEY (EmployeeID) REFERENCES dbo.T1(EmployeeID) ON DELETE CASCADE
  */
}


console.log(AssoModel);
console.log(AssoModel.prototype);
