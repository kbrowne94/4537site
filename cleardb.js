// at command prompt switch to the current directory of this file
//enter>npm install mysql

const mysql = require("mysql");

// Create connection
const con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b555e8d460014b",
  password: "52f1f8ac",
  database: "heroku_be16ae8798d1627"
});

// Connect to MySQL
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "INSERT INTO score(name, score) values ('Kyle', 1)";
    var sql = "SELECT * FROM score";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
