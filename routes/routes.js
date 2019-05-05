let express = require('express');
let route = express.Router();

const controller = require('../controller/controller.js');
var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');


module.exports = function(app,passport) {
		
	app.get('/', controller.index);
	// app.route('/').get(controller.index);  

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
	app.post('/login', passport.authenticate('local-login') ,  controller.getLogin);
// Gate
	app.post('/gates', controller.addGates);

	// app.post('/gates',(req, res) => {
	//   let data = {G_GATENAME: req.body.G_GATENAME, G_OPEN: req.body.G_OPEN, G_CLOSE: req.body.G_CLOSE};
	//   let sql = "INSERT INTO gate SET ?";
	//   let query = conn.query(sql, data,(err, results) => {
	//     if(err) throw err;
	//     res.redirect('/login');
	//   });
	// });

	app.get('/gates', controller.getGates);
	// app.get('/gates/:g_id', controller.users);
	// app.delete('/gates/:g_id', controller.users);

	return route;

};