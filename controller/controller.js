let express = require('express');
let route = express.Router();

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');

// app.use('/', router);

exports.index= (req,res)=>{
        // res.render('welcome.tl',{ message: req.flash('loginMessage') });
        res.send("Ini halaman utama");
};

exports.loginPage= (req,res)=>{
       var row = [];
        var row2=[];
        var id = req.params.id;
          // console.log("TES");
          console.log(id);
        connection.query('select * from users u , grup gr where id = ? and u.GR_ID = gr.GR_ID',[id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                        
                    }  
                }
                console.log(row);
                res.send(rows);
            }
            // res.render('index', {
            //         rows: row
            //     });

            // res.json(req.user.ID); 
            // res.render('index.tl', {rows : row});
            // req.send(req.params); 

        });
};

exports.getUsers= (req,res)=>{
        // console.log(req.user.id)
        
        // if (req.session.id == undefined || req.session.id == 0){
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
                            // res.send(rows);
                        }  
                    }
                }
                    connection.query('select * from users ', function (err, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        // if (rows.length) {
                        //     for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        //         row2[i] = rows[i];
                        //         // console.log(row[i]);                        
                        //     }  
                        // }
                        res.send(rows);
                    }                
                 // res.render('signup',{
                 //    message: req.flash('signupMessage'),
                 //    rows: row,
                 //    rows2 : row2
                 // });
                });
            });

        // }

};

exports.postUsers= (req,res)=>{
	 console.log("Berhasil mendaftar user");	
        // res.redirect('/');	 
};

exports.postLogin= (req,res)=>{
	 // console.log("hello");
  //           if (req.body.remember) {
  //             req.session.cookie.maxAge = 1000 * 60 * 3;
  //           } else {
  //             req.session.cookie.expires = false;
  //           }
  //       res.redirect('/');
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
             // res.render('login.tl',{
             //    message: req.flash('loginMessage'),
             //    rows: row
             // });
             res.send(req.flash('loginMessage'));
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
                    // res.send("Berhasil");
                    res.status(500).send(err);
                }else{
                    res.send("Berhasil");
                }
                // res.redirect('/gates');
            });
        }
    });
};

exports.getGates= (req,res)=>{
        var row = [];
            connection.query('select * from gate ', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(rows);
            }
        });     
        // var row = [];
        //     connection.query('select * from gate ', function (err, rows) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         if (rows.length) {
        //             for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
        //                 row[i] = rows[i];
        //                 // console.log(row[i]);                        
        //             }  
        //         }
        //     }
        
        //  res.render('gates.tl',{
        //     message: req.flash('signupMessage'),
        //     rows: row
        //  });
        // });        
};

exports.getIdUser= (req,res)=>{
      // req.params.id = req.user.ID;
      // console.log(req.params.id);
      // res.status(200).send(req.params.id);
      // const id = parseInt(req.params.id, 10);
      // console.log(id);
       var row = [];
        var row2=[];
        var id = req.params.id;
          // console.log("TES");
          console.log(id);
        connection.query('select * from users u , grup gr where id = ? and u.GR_ID = gr.GR_ID',[id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                // if (rows.length) {
                //     for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                //         row[i] = rows[i];
                        
                //     }  
                // }
                // console.log(row);
            res.send(rows);
            }
            // res.render('profile', {
            //         rows: row
            //     });
            // res.json(req.user.ID); 
            // res.render('index.tl', {rows : row});
            // req.send(req.params); 

        });


};

    exports.getLogout= (req,res)=>{
            // req.logout();
            // res.redirect('/');
    };

    exports.getDelUser = (req,res)=>{
        var row = [];
        var row2=[];
        var id = req.params.id;
          // console.log("TES");
        console.log("MASUK delete");
        connection.query('delete from users where ID = ?',[id], function (err, rows) {
            console.log("MASUK query delete");
            
            if (err) {
                console.log(err);
            } else {
                    console.log("harusnya ke user");
                     // res.redirect('/users');
                    res.send(rows);
            }
        });
    };

    exports.getIdGate= (req,res)=>{
      // req.params.id = req.user.ID;
      // console.log(req.params.id);
      // res.status(200).send(req.params.id);
      // const id = parseInt(req.params.id, 10);
      // console.log(id);
       var row = [];
        var row2=[];
        var g_id = req.params.g_id;
          //console.log("TES");
          //console.log(id);
        connection.query('select * from gate where g_id = ?',[g_id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                // if (rows.length) {
                //     for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                //         row[i] = rows[i];
                        
                //     }  
                // }
                // console.log(row);
                res.send(rows);

            }
            // res.render('gate', {
            //         rows: row
            //     });
            // res.json(req.user.ID); 
            // res.render('index.tl', {rows : row});
            // req.send(req.params); 

        });
    };

    exports.getDelGate=(req,res)=>{
        var row = [];
        var row2=[];
        var id = req.params.g_id;
          // console.log("TES");
        console.log("MASUK delete");

        connection.query('select * from hak_akses where g_id = ?',[id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (!rows.length) {
                            connection.query('delete from gate where g_id = ?',[id], function (err, rows) {
                            console.log("MASUK query delete");            
                            if (err) {
                                console.log(err);
                            } else {
                                    console.log("harusnya ke user");
                                    res.send(rows);                                    
                                     // res.redirect('/gates');
                            }
                        });
  
                }else{
                    connection.query('delete from hak_akses where g_id = ?',[id], function (err, rows) {
                            console.log("MASUK query delete");            
                            if (err) {
                                console.log(err);
                            } else {
                                connection.query('delete from gate where g_id = ?',[id], function (err, rows) {
                                console.log("MASUK query delete");            
                                if (err) {
                                    console.log(err);
                                } else {
                                       console.log("harusnya ke user");
                                         // res.redirect('/gates');
                                        res.send(rows);       
                                }
                        });
                                    
                            }
                        });
                }

            }
        });

    };

exports.addHakAkses= (req,res)=>{
    var role = req.body.role;
    var gate = req.body.gate;
    console.log("masuk");

    var addQuery = "SELECT * FROM `gate` WHERE G_ID = '" + gate + "'";

    // let query = "INSERT INTO `hak_akses` (GR_ID, G_ID) VALUES (? , ?)";
    console.log(role);
    console.log(gate);
    var insertQuery = "INSERT INTO `hak_akses` (GR_ID, G_ID) VALUES ('" + role + "' , '" + gate + "')";
    
    connection.query(insertQuery, (err, result) => {
    console.log("masuk query");
        if (err) {
                console.log(err);
        }
        // res.redirect('/');
        res.send("Berhasil");
        // res.send(result);
    });

    };

exports.getHakAkses= (req,res)=>{
        var row = [] ;
        var row2 = [] ;

        connection.query('select * from gate', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];

                    }  
                }
            }
             connection.query('select * from grup', function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    if (rows.length) {
                        for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                            row2[i] = rows[i];
                         
                        }  
                    }
                }
                // console.log(row);                        
                // console.log(row2);
                res.send("Berhasil");
                // res.render('HakAkses.tl',{
                //     message: req.flash('signupMessage'),
                //     rows: row,
                //     rows2 : row2
                //  });
            });
        });
    };

    // exports.addRole= (req,res)=>{
    // var GR_ROLE = req.body.GR_ROLE;
    // // var gate = req.body.gate;
    // console.log("masuk");

    // // var addQuery = "SELECT * FROM `grup`";

    // // let query = "INSERT INTO `hak_akses` (GR_ID, G_ID) VALUES (? , ?)";
    // console.log(role);
    // console.log(gate);
    // var insertQuery = "INSERT INTO `grup` (GR_ID) VALUES ('" + GR_ROLE + "')";
    
    // connection.query(insertQuery, (err, result) => {
    // console.log("masuk query");
    //     if (err) {
    //             console.log(err);
    //     }
    //     else{
    //         res.send("berhasil");

    //     }

    // });

    // };

exports.getRole= (req,res)=>{
        var row = [] ;
        var row2 = [] ;

         connection.query('select * from grup', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row2[i] = rows[i];
                     
                    }  
                }
            }
            res.send(rows);

        });

    };