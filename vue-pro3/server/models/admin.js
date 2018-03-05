var mysql = require('mysql');
var sqlMap = require('../sqlMap');
var pool = require('../dbPool.js');
var User = require('./user');


pool.on('connection', function(connection) {
    //让session每次自增长1
    connection.query('SET SESSION auto_increment_increment=1');
});


function Admin(user){
    User.call(this,user.username,user.email,user.password);
};

module.exports = Admin;

pool.getConnection(function(err, connection) {
  

    //继承User类的原生链
    Admin.prototype = Object.create(User.prototype);
    Admin.prototype.constructor = Admin;
});
