
var dbconfig = require('./config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var express  = require('express');
var app      = express();
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');
const tl = require('express-tl');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

require('./config/passport.js')(passport); 
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// var controller = require('./controller/controller');

app.engine('tl',tl);
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'tl'); 
const fs = require('fs');
// let code = fs.readFileSync('./views/signup.tl', 'utf8');
// const compile = require('template-literal');
// let runTemplate = compile(code);
// required for passport
app.use(session({
    secret: 'pbkk9',
    resave: true,
    saveUninitialized: true
 } )); 

// session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 


// routes ======================================================================
require('./routes/routes.js')(app, passport); 
// require('./controller/controller.js')(app, passport); 

// const route = require('./routes/routes');
// app.use('./routes/routes.js');
// route(app,passport);

// launch ======================================================================
app.listen(port);
console.log('pbkk kelompok 9  localhost: ' + port);

module.exports = app;