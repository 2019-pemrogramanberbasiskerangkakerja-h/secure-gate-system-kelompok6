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
        done(null, users.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
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

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
        passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            nrpField : 'u_nrp',
//            usernameField : 'u_nama',
            passwordField : 'u_password',
//            roleField : 'u_role',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        
        // console.log("login");
        function(req, u_nrp, u_password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM users WHERE u_nrp = ?",[u_nrp], function(err, rows){
                if (err)
                    console.log(err);
                    return done(err);
                if (!rows.length) {
                    console.log("test");
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }


                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
