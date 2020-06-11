var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.CreateConnection({
    host: localhost,
    user: ubuntu,
    password: roqkfwk77,
    database: o2
});
conn.connect();

app.use(bodyParser.urlencodedls({extended: false}));
app.use(bodyParser.json());

app.get('/app/hello', function(req, res){
    res.send('hello');
});

app.listen(5000, function(){
    console.log('hello');
});
