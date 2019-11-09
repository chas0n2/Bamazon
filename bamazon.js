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
            colWidths: [10,35,15,10,10]
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

function order(ID, qty){
    connection.query("SELECT * FROM Products WHERE item_id =? ", [ID], function(err, res) {
        if(err){console.log(err)}
        if(qty <= res[0].stock_quantity){
            var total = res[0].price * qty;
            var newQty = res[0].stock_quantity - qty;
            console.log("Your order is in stock!");
            //Letting user know product is in stock
            console.log("Your total cost for " + qty + " " + res[0].product_name + " is " + total + ", Thank you!");
            connection.query("UPDATE Products SET stock_quantity =? WHERE item_id =? ", [newQty, ID]);
        } else {
            console.log("Insufficient quantity! We do not have enough " + res[0].product_name + "to complete order.");
        };
        dispProducts();

        
    });
};

// Want to add a checkout cart that shows the user what they've currently added and what is left in stock.
// going to create a function that allows the user after looking at the cart if they are sure this is what they want.
// create a function that shows total cost of all products in cart.
// Allow user to exit server.
