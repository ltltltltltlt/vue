var mysql = require('mysql');
var DB_NAME = 'test';

var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root'
});

pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});

function User(user){
    this.username = user.username;
    this.email = user.email;
    this.pwd = user.pwd;
};
module.exports = User;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USEDb Error: " + err.message);
            return;
        }
        console.log('USEDb succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            username:this.username,
            email: this.email,
            pwd: this.pwd
        };
        
        //插入一条数据到数据库
        var insertUser_Sql = "INSERT INTO user(id,username,email,password) VALUES(0,?,?,?)";

        connection.query(insertUser_Sql, [user.username,user.email, user.pwd], function (err,result) {
            if (err){
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("insertUser succeed");
            callback(err,result);
        });

    };

    //根据用户名得到已注册的用户名数量
    User.getUserNumByUsername = function getUserNumByUsername(username, callback) {

        var getUserNumByUsername_Sql = "SELECT COUNT(1) AS num FROM user WHERE username = ?";

        connection.query(getUserNumByUsername_Sql, [username], function (err, result) {
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
    User.getUserNumByEmail = function getUserNumByEmail(email, callback){

        var getUserNumByEmail_Sql = "SELECT COUNT(1) AS num FROM user WHERE email = ?";

        connection.query(getUserNumByEmail_Sql, [email], function (err, result) {
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
    User.getUserByEmail = function getUserNumByEmail(email, callback) {

        var getUserByEmail_Sql = "SELECT * FROM user WHERE email = ?";

        connection.query(getUserByEmail_Sql, [email], function (err, result) {
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
    User.getUserByUsername = function getUserByUsername(username, callback) {

        var getUserByUsername_Sql = "SELECT * FROM user WHERE username = ?";

        connection.query(getUserByUsername_Sql, [username], function (err, result) {
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

