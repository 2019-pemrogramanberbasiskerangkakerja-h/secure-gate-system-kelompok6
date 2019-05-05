var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    // console.log("hello masuk passpord");
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE ID = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            nrpField : 'id',
            usernameField : 'username',
            passwordField : 'password',
            roleField : 'role',
            passReqToCallback : true 
        },
        function(req,id,username, done) {
                // console.log("hello masuk signup");
            var id = req.body.id;
            var username = req.body.username;
            var password = req.body.password;
            var role = req.body.role;
            connection.query("SELECT * FROM users WHERE ID = ?",[id], function(err, rows) {
                // console.log("masuk query");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That nrp is already taken.'));
                } else {
                    var newUserMysql = {
                        id:id,
                        username: username,
                        password: bcrypt.hashSync(password, null, null), 
                        role:role
                    };

                    var insertQuery = "INSERT INTO users ( ID, USERNAME, PASSWORD, GR_ID ) values (?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.id, newUserMysql.username, newUserMysql.password, newUserMysql.role],function(err, rows) {

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // passport.use(new LocalStrategy(user.authenticate()));
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'id',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, id, password, done) { 
            var insertQuery = "INSERT INTO log ( L_ID, ID ,G_ID , L_TIME ,L_STATUS ) values (?,?,?,?,?)";
            var insertQuery2 = "SELECT * FROM users , memiliki , gerbang WHERE users.id = ? and users.id = memiliki.id and gerbang.K_ID = memiliki.K_ID and gerbang.K_JAMAWAL <= CAST(? as time) and gerbang.K_JAMAKHIR >= CAST(? as time)"

            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
             connection.query(insertQuery2 ,[id , time , time],function(err, rows){
                    var newUserLogin = {
                    id:id,
                    L_DATE: time,
                    L_STATUS: 0
                };

                if (err){
                    connection.query(insertQuery,[newUserLogin.id, newUserLogin.L_DATE, newUserLogin.L_STATUS],function(err, rows) {
                    });

                    return done(err);
                }
                if (!rows.length) {
                    connection.query(insertQuery,[newUserLogin.id, newUserLogin.L_DATE, newUserLogin.L_STATUS],function(err, rows) {
                    });
                    return done(null, false, req.flash('loginMessage', 'gagal login.'));
 
                }
                if (!bcrypt.compareSync(password, rows[0].password)){
                
                     connection.query(insertQuery,[newUserLogin.id, newUserLogin.L_DATE, newUserLogin.L_STATUS],function(err, rows) {
                    });
                    return done(null, false, req.flash('loginMessage', 'password salah'));
                }

                var newUserLogin = {
                    id:id,
                    L_DATE: time,
                    L_STATUS: 1
                };    
                
                connection.query(insertQuery,[newUserLogin.id, newUserLogin.L_DATE, newUserLogin.L_STATUS],function(err, rows) {
                });

                return done(null, rows[0]);  

            });
        })
    );
};