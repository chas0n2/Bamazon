var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table"); //Used cli-table npm API

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gt36THSM",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    dispProducts(function() {

    });

});

var dispProducts = function() {
    var query = "SELECT * FROM Products";
    connection.query(query, function(err, res){
        if (err) throw err;
        var newTable = new table ({ //cli-table
            head: ["Item ID", "Product", "Category", "Price", "Quantity"],
            colWidths: [20,35,20,20,20]
        });
        for(var i = 0; i < res.length; i++){
        newTable.push( //method to push array
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );                       
    }
    console.log(newTable.toString() );
    custPrompt();
});

}

function custPrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter the Item ID to select your purchase.",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many would you like to purchase?",
            filter: Number
        },
        {
            type: "confirm",
            name: "select",
            message: "Is this correct?", //Allowing customer to confirm their order
        },
    ]).then(function(answers) {
        var quantityAsked = answers.Quantity;
        var idreq = answers.ID;
        order(idreq, quantityAsked);
    });
};

function order(ID, amount){
    connection.query("SELECT * FROM Products WHERE item_id = " + ID, function(err, res) {
        if(err){console.log(err)}
        if(amount <= res[0].stock_quantity){
            var total = res[0].price * amount;
            console.log("Your order is in stock!");
            //Letting user know product is in stock
            console.log("Your total cost for " + amount + " " + res[0].product_name + " is " + total + ", Thank you!");
            connection.query("UPDATE Products SET stock_quantity = stock_quantity - " + amount + "WHERE item_id = " + ID);
        } else {
            console.log("Insufficient quantity! We do not have enough " + res[0].product_name + "to complete order.");
        };
        dispProducts();

        
    });
};

dispProducts();

