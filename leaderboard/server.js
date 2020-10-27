let http = require('http');
let url = require('url')
const mysql = require("mysql");
const { connect } = require('http2');

const PORT = 8080;

// Create connection
const con = mysql.createPool({
  connectionLimit : 5,
  host: "us-cdbr-east-02.cleardb.com",
  user: "b555e8d460014b",
  password: "52f1f8ac",
  database: "heroku_be16ae8798d1627"
});




const server = http.createServer((req, res) => {
    const headers = {
        'Content-Type': 'text/plain',
      };
    let statusCode = 404;
    let result;
    if (req.url === '/') {
        if (req.method === 'GET') {
            statusCode = 200;
            result = 'Hello, world!';
            // console.log(req)
            con.getConnection(function (err, connection) {
                const sql = "SELECT * FROM score";
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) throw err;
                    const formatted_result = JSON.parse(JSON.stringify(result))
                    console.log(result);
                    res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(formatted_result));
                });

            });
            // const sql = "INSERT INTO score(name, score) values ('Kyle', 1)";
            
        } else if(req.method === 'POST'){
            let body = '';
            req.on('data', function (data) {
                body+= data;
                console.log('Partial body: ' + body)
              })
            req.on('end', function() {
                console.log('body ' + body);
                body = JSON.parse(body);
                console.log(body.score);
                
                res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
                res.end('post received');

            })
        };
    }
});

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})