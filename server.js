var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/login', function(req, res){
   if(req.session.usermame){
      // req.session.page_views++;
      res.send("You are already login " + req.session.usermame);
   } else {
      req.session.usermame = 'papuci_gucci';
      res.send("Welcome back" + req.session.usermame);
   }
});

app.use(express.static('public'))

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/slope.routes.js')(app);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})