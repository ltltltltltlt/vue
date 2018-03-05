var mysql = require('mysql');
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var User = require('./user');

pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});


function Teacher(teacher){
    User.call(this,teacher);
};

module.exports = Teacher;

pool.getConnection(function(err, connection) {
  
    connection.query(sqlMap.db.useDbSql, function (err) {
        if (err) {
          console.log("USEDb Error: " + err.message);
          return;
        }
        console.log('Teacher USEDb succeed');
    });

    //继承User类的原生链
    Teacher.prototype = Object.create(User.prototype);
    Teacher.prototype.constructor = Teacher;


    //根据用户名得到已注册的用户名数量
    Teacher.getUserNumByUsername = function getUserNumByUsername(username, callback) {

        connection.query(sqlMap.teacher.getUserNumByUsername_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByUsername Error: " + err.message);
                return;
            }

            //connection.release();
           
            console.log("getUserNumByUsername succeed");
            callback(err,result);
        
        });
       
    };


    //根据邮箱名得到邮箱已注册的数量
    Teacher.getUserNumByEmail = function getUserNumByEmail(email, callback){

        connection.query(sqlMap.teacher.getUserNumByEmail_Sql, [email], function (err, result) {
            if (err) {
                console.log("getUserNumByEmail Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("getUserNumByEmail succeed");
            callback(err,result);
        
        });
        
    };

    //根据邮箱名得到用户信息
    Teacher.getUserByEmail = function getUserNumByEmail(email, callback) {
        
        connection.query(sqlMap.teacher.getUserByEmail_Sql, [email],function (err, result) {
            if (err) {
                console.log("getUserByEmail Error: " + err.message);
                return;
            }

            //connection.release();
            console.log("getUserByEmail succeed");
            callback(err,result);
          
        });
       
    };


    //根据用户名得到用户信息
    Teacher.getUserByUsername = function getUserByUsername(username, callback) {

        connection.query(sqlMap.teacher.getUserByUsername_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUsername Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("getUserByUsername succeed");
            callback(err,result);
          
        });
        
    };

    //释放连接
    connection.release();
});

