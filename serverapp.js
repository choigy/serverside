var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'ubuntu',
    password: 'roqkfwk77',
    database: 'o2'
});
conn.connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/students', function(req,res){
    var sql = 'select * from customer';
    conn.query(sql, function(err, rows, field){
        res.send(rows);
    })
})

app.get('/app/hello', function(req, res){
    res.send('hello');
});

app.listen(5000, function(){
    console.log('hello');
});
