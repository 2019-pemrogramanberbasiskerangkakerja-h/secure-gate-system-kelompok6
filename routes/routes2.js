const express = require('express');
const route = express.Router();

const controller = require('../controller/controller.js');
var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
require('../config/passport.js')(passport); 


// 'use strict';
// module.exports = function(app) {

// // const controller = require('../controller/controller.js');
//     // var todoList = require('./controller');
//     // app.route('/').get(controller.index);
//     // app.route('/users')
//     //     .get(todoList.users);
// 	route.get('/', controller.index);
//   // user
// 	//add user
// 	// app.post('/users', controller.postUsers);
// 	// get user
// 	// app.route('/users').get(controller.users);
// 	// app.get('/users', controller.getUsers);
// 	//Get info user
// 	// route.get('/users/:id', controller.users);
// 	// Delete user
// 	// route.delete('/users/:id', controller.users);


// };
module.exports = function(app, passport) {
	
	// app.get('/', controller.index);
	// app.get('/users', controller.getUsers);

};


// route.get('/', controller.index)(app, passport);
// user
//add user
// route.post('/users', controller.postUsers);
// get user
// route.get('/users', controller.getUsers)(app, passport);
//Get info user
// route.get('/users/:id', controller.users);
// Delete user
// route.delete('/users/:id', controller.users);

// auth-login
// route.post('/login', controller.login);


// Gate
// route.post('/gates', controller.users);
// route.get('/gates', controller.users);
// route.get('/gates/:g_id', controller.users);
// route.delete('/gates/:g_id', controller.users);

module.exports=route;