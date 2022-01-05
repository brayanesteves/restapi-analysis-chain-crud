const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mipss_'
});

mysqlConnection.connect(function(err) {
    if(err) {
        console.error(err);
        return;
    } else {
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;