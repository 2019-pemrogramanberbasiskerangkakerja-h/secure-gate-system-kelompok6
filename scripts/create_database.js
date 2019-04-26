/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `u_nrp` CHAR(14) NOT NULL, \
    `u_nama` VARCHAR(50) NOT NULL, \
    `u_password` VARCHAR(50) NOT NULL, \    
    `u_role` VARCHAR(10) NOT NULL, \
        PRIMARY KEY (`u_nrp`), \
    UNIQUE INDEX `u_nrp_UNIQUE` (`u_nrp` ASC), \
    UNIQUE INDEX `u_nama_UNIQUE` (`u_nama` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
