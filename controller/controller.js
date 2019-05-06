let express = require('express');
let route = express.Router();

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');

// app.use('/', router);


exports.index= (req,res)=>{
        // res.render('login.tl',{ message: req.flash('loginMessage') });
        res.redirect('/users');
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
                message: req.flash('message'),
                rows: row
             });
        });

};

exports.addGates= (req, res) => {
//    let message = '';
    let G_GATENAME = req.body.G_GATENAME;
    let G_OPEN = req.body.G_OPEN;
    let G_CLOSE = req.body.G_CLOSE;
    let G_ROLE = req.body.role;
    // console.log(G_ROLE);

    let addQuery = "SELECT * FROM `gate` WHERE G_GATENAME = '" + G_GATENAME + "'";

    connection.query(addQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // if (result.length > 0) {
        //     message = 'Gate name already exists';
        //     res.render('gates.tl', {
        //         message,
        //         title: Welcome to GERBANG IF | Add a new gates
        //     });
        // } 
        else {
            let query = "INSERT INTO `gate` (G_GATENAME, G_OPEN, G_CLOSE, G_ROLE) VALUES ('" +
                G_GATENAME + "', '" + G_OPEN + "', '" + G_CLOSE + "', '" + G_ROLE + "')";
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
             res.render('gates',{
                message: req.flash('message'),
                rows: row
             });
        });
};