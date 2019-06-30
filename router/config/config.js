 var mysql = require('mysql');
//Office Server
var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',// '127.0.0.1',  
     port: 3306,
     user:'sql12297159',//'root',
   password: 'h3Reyy2PzY',//'olwa3xbMbVO80L',
    database:'sql12297159',
multipleStatements: true
    //socketPath:process.env.socketPath//'/cloudsql/${flowing-perigee-236909:asia-south1:doctor}'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err,": Error while connecting with database");
}
});
module.exports = connection;


// [START cloud_sql_mysql_mysql_create]
//const connection = mysql.createPool({
  //  user: process.env.DB_USER, // e.g. 'my-db-user'
    //password: process.env.DB_PASS, // e.g. 'my-db-password'
    //database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    //socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // If connecting via TCP, enter the IP and port instead
    // host: 'localhost',
    // port: 3306,
  
    //[START_EXCLUDE]
  
    // [START cloud_sql_mysql_mysql_limit]
    // 'connectionLimit' is the maximum number of connections the pool is allowed
    // to keep at once.
    //connectionLimit: 5,
    // [END cloud_sql_mysql_mysql_limit]
  
    // [START cloud_sql_mysql_mysql_timeout]
    // 'connectTimeout' is the maximum number of milliseconds before a timeout
    // occurs during the initial connection to the database.
    //connectTimeout: 10000, // 10 seconds
    // 'acquireTimeout' is the maximum number of milliseconds to wait when
    // checking out a connection from the pool before a timeout error occurs.
    //acquireTimeout: 10000, // 10 seconds
    // 'waitForConnections' determines the pool's action when no connections are
    // free. If true, the request will queued and a connection will be presented
    // when ready. If false, the pool will call back with an error.
    //waitForConnections: true, // Default: true
    // 'queueLimit' is the maximum number of requests for connections the pool
    // will queue at once before returning an error. If 0, there is no limit.
    //queueLimit: 0, // Default: 0
    /// [END cloud_sql_mysql_mysql_timeout]
  
    // [START cloud_sql_mysql_mysql_backoff]
    // The mysql module automatically uses exponential delays between failed
    // connection attempts.
    // [END cloud_sql_mysql_mysql_backoff]
  
    //[END_EXCLUDE]
  //});

  module.exports = connection;
  