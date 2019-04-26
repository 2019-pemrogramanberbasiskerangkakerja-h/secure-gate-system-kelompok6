var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            nrpField : 'id',
            usernameField : 'username',
            passwordField : 'password',
            roleField : 'role',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,id,username, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            var id = req.body.id;
            var username = req.body.username;
            var password = req.body.password;
            var role = req.body.role;
            connection.query("SELECT * FROM users WHERE id = ?",[id], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That nrp is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        id:id,
                        username: username,
                        password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                        role:role
                    };

                    var insertQuery = "INSERT INTO users ( id, username, password, role ) values (?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.id, newUserMysql.username, newUserMysql.password, newUserMysql.role],function(err, rows) {

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );


    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'id',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, id, password, done) { 
            connection.query("SELECT * FROM users WHERE id = ?",[id], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'bulunamadi.')); 
                }

           
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'yanlis parola.'));

          
                return done(null, rows[0]);
            });
        })
    );
};