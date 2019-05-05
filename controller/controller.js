let express = require('express');
let route = express.Router();

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');

// app.use('/', router);


exports.index= (req,res)=>{
        res.render('login.tl',{ message: req.flash('loginMessage') });
};

exports.getUsers= (req,res)=>{
		var row = [];
        var row2 = [];

        connection.query('select * from grup', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                        // console.log(row[i]);                        
                    }  
                }
            }
            // row2 = Object.values(JSON.parse(JSON.stringify(row)));
	       // var ids = row2.map(x => x.GR_ID);
			// console.log(ids)
	       // console.log(row2.GR_ID);            
	       // console.log(row[0]);

    		// rowid = row.map(v => v.GR_ID);
    		// console.log(rowid);
    		// rowrole = row.map(v => v.GR_ROLE);
    		// console.log(rowrole);	       

	         res.render('signup',{
	         	message: req.flash('message'),
	         	rows: row
	         });
        });
};

exports.postUsers= (req,res)=>{
	 console.log("Berhasil mendaftar user");	
        res.redirect('/');	 
};

exports.getLogin= (req,res)=>{
	 console.log("hello");
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
};

// module.exports = function(app,passport) {
		
// 		exports.index= (req,res)=>{
// 		    // if(req.session.nrp=== undefined || req.session.nrp==='0'){
// 		    //   return res.render('login');
// 		    // }
// 		    // else{
// 		    //   return res.redirect('/dashboard');
// 		    // }
// 		        res.render('login.tl',{ message: req.flash('loginMessage') });
// 		};

// 		// exports.getUsers= (req,res)=>{
// 		//          res.render('signup.tl',{message: req.flash('message')});
// 		// };

// 		// exports.postUsers= (req,res)=>{
// 		// };

// };