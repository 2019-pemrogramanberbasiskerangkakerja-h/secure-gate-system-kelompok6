var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // passport session setup 
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //   done(null, user);
    // });

    // //used to deserialize the user
    // passport.deserializeUser(function(user, done) {
    //   done(null, user);
    // });

    passport.serializeUser(function(users, done) {
        done(null, users.u_nrp);
    });

    // used to deserialize the user
    passport.deserializeUser(function(u_nrp, done) {
        connection.query("SELECT * FROM users WHERE u_nrp = ? ",[u_nrp], function(err, rows){
            done(err, rows[0]);
        });
    });

    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            nrpField : 'u_nrp',
            usernameField : 'u_nama',
            passwordField : 'u_password',
            roleField : 'u_role',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,u_nrp,u_nama, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            var u_nrp = req.body.u_nrp;
            var u_nama = req.body.u_nama;
            var u_password = req.body.u_password;
            var u_role = req.body.u_role;
            connection.query("SELECT * FROM users WHERE u_nrp = ?",[u_nrp], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That nrp is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        u_nrp:u_nrp,
                        u_nama: u_nama,
                        u_password: bcrypt.hashSync(u_password, null, null), // use the generateHash function in our user model
                        u_role:u_role
                    };

                    var insertQuery = "INSERT INTO users ( u_nrp, u_nama, u_password, u_role ) values (?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.u_nrp, newUserMysql.u_nama, newUserMysql.u_password, newUserMysql.u_role],function(err, rows) {

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            connection.query("SELECT * FROM users WHERE nrp = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found!.')); 
                }

           
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

          
                return done(null, rows[0]);
            });
        })
    );
};