var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gt36THSM",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "Product",
            type: 
        })
}