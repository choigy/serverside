var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'ubuntu',
    password: 'roqkfwk77',
    database: 'o2'
});
conn.connect();

app.use(express.static(path.join(__dirname, '/reactapp/build')));
app.use(session({
  secret:'sdfas75043@dfs%$#@@%',
  resave:false,
  saveUninitialized:true,
  store:new MySQLStore({
    host:'localhost',
    port:3306,
    user:'ubuntu',
    password:'roqkfwk77',
    database:'o2'
  })
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  var sql = 'select * from customer where email=?'
  conn.query(sql, [id], function(err, result){
    if(err){
      console.log('err')
    } else {
      done(null, result[0])
    }
  })
  //User.findById(id, function(err, user) {
  //  done(err, user);
  });


passport.use(new GoogleStrategy({
    clientID: "24311561951-gi52o5dgt818cvd09fk2eueg9rps580a.apps.googleusercontent.com",
    clientSecret: "Q7Aaw_drnWCKmGlOzXf6E2FH",
    callbackURL: "http://test1kim.ga/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        var email = profile.emails[0].value;
        var sql = 'select * from customer where email=?';
        conn.query(sql, [email], function(err, result){
          if(result.length>0){
            done(null, result[0]);
          } else {
            var newcustomer = {
              'email':profile.emails[0].value,
              'name':profile.displayName,
            };
            var sql = 'insert into customer set ?'
            conn.query(sql, newcustomer, function(err, result){
              if(err){
                console.log('err')
              } else {
                done(null, newcustomer)
              }
            })
          }
        })
       //User.findOrCreate({ googleId: profile.id }, function (err, user) { 
        // return done(err, user);
      })
  );

app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'] 
    }
  ));

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/' 
    }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/students', function(req,res){
    var sql = 'select * from customer';
    conn.query(sql, function(err, rows, field){
        res.send(rows);
    })
})

app.get('/', function(req, res){
    res.send(
      console.log('hello')
    );
});

app.listen(5000, function(){
    console.log('hello');
});
