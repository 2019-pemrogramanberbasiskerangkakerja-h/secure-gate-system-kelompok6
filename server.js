
var dbconfig = require('./config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');

const tl = require('express-tl');

require('./config/passport.js')(passport); 


app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.engine('tl',tl);

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'tl'); 
// required for passport
app.use(session({
    secret: 'pbkk9',
    resave: true,
    saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 


// routes ======================================================================
require('./app/routes.js')(app, passport); 

// launch ======================================================================
app.listen(port);
console.log('pbkk kelompok 9  localhost: ' + port);
