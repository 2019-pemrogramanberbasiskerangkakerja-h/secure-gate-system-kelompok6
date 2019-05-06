let express = require('express');
let route = express.Router();

const controller = require('../controller/controller.js');
var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');


module.exports = function(app,passport) {
		
	app.get('/', controller.index);
// user
	//add user
	app.post('/users', passport.authenticate('local-signup') , controller.postUsers  );
	// get user
	app.get('/users', controller.getUsers);
	//Get info user
	// app.get('/users/:id', controller.users);
	// Delete user
	// app.delete('/users/:id', controller.users);

// auth-login
	app.post('/login', passport.authenticate('local-login', {
		    SuccessRedirect : '/gates', 
            failureRedirect : '/login',
            failureFlash : true
	}) ,  controller.postLogin);
	
	app.get('/login', controller.getLogin);	
// Gate
	app.post('/gates', controller.addGates);
	app.get('/gates', controller.getGates);
	// app.get('/gates/:g_id', controller.users);
	// app.delete('/gates/:g_id', controller.users);

	return route;

};

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
//     }else{
//         res.redirect('/login');
//     }
// }