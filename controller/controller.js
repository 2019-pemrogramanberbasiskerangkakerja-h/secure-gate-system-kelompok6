let express = require('express');
let route = express.Router();

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');

// app.use('/', router);

exports.index= (req,res)=>{
        res.render('welcome.tl',{ message: req.flash('loginMessage') });
        //res.redirect('/users');
};

exports.getUsers= (req,res)=>{
        // console.log(req.user.id)
        
        // if (req.user.ID === undefined || req.user.ID === 0){
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
                    message: req.flash('signupMessage'),
                    rows: row
                 });
            });

        // }

};

exports.postUsers= (req,res)=>{
	 console.log("Berhasil mendaftar user");	
        // res.redirect('/');	 
};

exports.postLogin= (req,res)=>{
	 console.log("hello");
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
};

exports.getLogin= (req,res)=>{
        var row = [];
        var row2 = [];

        connection.query('select * from gate', function (err, rows) {
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
             res.render('login',{
                message: req.flash('loginMessage'),
                rows: row
             });
        });

};

exports.addGates= (req, res) => {
//    let message = '';
    let G_GATENAME = req.body.G_GATENAME;
    let G_OPEN = req.body.G_OPEN;
    let G_CLOSE = req.body.G_CLOSE;
    // console.log(G_ROLE);

    let addQuery = "SELECT * FROM `gate` WHERE G_GATENAME = '" + G_GATENAME + "'";

    connection.query(addQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        else {
            let query = "INSERT INTO `gate` (G_GATENAME, G_OPEN, G_CLOSE) VALUES ('" +
                G_GATENAME + "', '" + G_OPEN + "', '" + G_CLOSE + "')";
            connection.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        }
    });
};

exports.getGates= (req,res)=>{
        res.render('gates',{
            message: req.flash('message')
         });
};

exports.getIdUser= (req,res)=>{
      // req.params.id = req.user.ID;
      // console.log(req.params.id);
      // res.status(200).send(req.params.id);
      // const id = parseInt(req.params.id, 10);
      console.log(id);
       var row = [];
        var row2=[];
          console.log("TES");
          console.log(req.user.ID);
        connection.query('select * from users u , grup gr where id = ? and u.GR_ID = gr.GR_ID',[req.user.ID], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                        
                    }  
                }
                console.log(row);
            }
            res.render('index', {
                    rows: row
                });
            // res.json(req.user.ID); 
            // res.render('index.tl', {rows : row});
            // req.send(req.params); 

        });
};