var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    // console.log("hello masuk passpord");
    passport.serializeUser(function(user, done) {
        // console.log(user.id);
        console.log(user.ID);
        done(null, user.ID);
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
            roleField : 'role',
            passReqToCallback : true 
        },
       function(req, id, password, done) { 
            var insertQuery = "INSERT INTO log ( id, L_DATE, L_STATUS ) values (?,?,?)";
            // var insertQuery2 = "SELECT * FROM users u , hak_akses ha , gate ga , grup g WHERE u.ID = ? and g.GR_ID = u.GR_ID and ha.GR_ID = g.GR_ID and ga.G_ID = ? and ga.G_ID = ha.G_ID and ga.G_OPEN <= CAST(? as time) and ga.G_CLOSE > CAST(? as time)";
            var insertQuery2 = "SELECT * FROM users WHERE ID = ?"
            var id = req.body.id;
            var gate = req.body.role;  
            var password = req.body.password;     
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
             
             connection.query(insertQuery2,[id],function(err, rows){
                console.log(rows);
            
                if (err){
                    console.log("tes");
                    return done(err);
                }

                if (!rows.length) {
                     console.log("tes2");
                    return done(null, false, req.flash('loginMessage', 'gagal login.'));
                
                }
                console.log(password);
                console.log(rows[0].PASSWORD);

                if (!bcrypt.compareSync(password, rows[0].PASSWORD)){
                
                    return done(null, false, req.flash('loginMessage', 'password salah'));
                }

                console.log("tanpa err");
                return done(null, rows[0]);  

            });
        })
    );
};