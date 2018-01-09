// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id,username,email,password) values (0,?,?,?)',
        queryById: 'select * from user where id = ?',
        queryByUsername: 'select * from user where username = ?',
        queryByEmail: 'select count(1) as num from user where email = ?'
    }
}

module.exports = sqlMap;
