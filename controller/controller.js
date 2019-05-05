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
