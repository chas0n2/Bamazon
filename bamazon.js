var mysql = require("mysql");
var inquirer = require("inquirer");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gt36THSM",
    database: "bamazonDB"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + Conn.threadId);
});

var dispProducts = function() {
    var query = "SELECT * FROM Products WHERE"
}

