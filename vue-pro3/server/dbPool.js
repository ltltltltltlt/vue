var mysql = require('mysql');

//数据库连接配置
var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root'
});

module.exports = pool;