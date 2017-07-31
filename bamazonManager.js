var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw (err);
	start();
});

function start() {
	inquirer.
		prompt([
		{
			name: "operation",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"View Products for Sale",
				"View Low Inventory",
				new inquirer.Separator(),
				"Add to Inventory",
				"Add New Product"
				]
		}
		]).then(function(answer) {
			if (answer.operation === "View Products for Sale") {
				viewProducts();
			} else if (answer.operation === "View Low Inventory") {
				lowInventory();
			} else if (answer.operation === "Add to Inventory") {
				addInventory();
			} else {
				addProduct();
			}
		});
}

function nowWhat() {
    inquirer.
    	prompt([
    	{
    		name: "next",
    		type: "confirm",
    		message: "Would you like to do something else?",
    		default: false
    	}
    	]).then(function(ans) {
    		if (ans.next === true) {
    			start();
    		} else {
    			console.log("Session ended");
    			connection.end();
    		};
    	});
	
}

function viewProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw (err);
    console.log("Item ID | Product | Department | Price | Inventory");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
    };
    console.log("-----------------------------------");
    nowWhat();
	});
}

function lowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 3 ORDER BY stock_quantity", function(err, res) {
		if (err) throw (err);
    console.log("Item ID | Product | Inventory");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
    };
    console.log("-----------------------------------");
    nowWhat();
    });
} 

function addInventory() {
	inquirer.
		prompt([
		{
			name: "choiceId",
			type: "input",
			message: "Enter Item ID to add inventory."
		},
		{
			name: "addQuantity",
			type: "input", 
			message: "Enter number of units to add."
		}
		]).then(function(ans) {
			var chosenItem;
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw (err);
				for (var i = 0; i < res.length; i++) {
					if (res[i].item_id === parseInt(ans.choiceId)) {
      					chosenItem = res[i];
      				};
    			};
    			var newStock = chosenItem.stock_quantity + parseInt(ans.addQuantity);
      				//console.log("new stock level is ", newStock);
      				connection.query("UPDATE products SET ? WHERE ?",
      					[
      					  {
      					  	stock_quantity: newStock
      					  },
      					  {
      					  	item_id: chosenItem.item_id
      					  }	
      					],
      					function(error) {
      						if (error) throw err;
      						console.log(ans.addQuantity + " unit(s) added to Item " + chosenItem.item_id + ".");
      						nowWhat();
					});
				
			});
		})
}    

function addProduct() {
	inquirer.
		prompt([
		{
			name: "newProd",
			type: "input",
			message: "What product would you like to add?"
		},
		{
			name: "newDept",
			type: "input",
			message: "Enter product's department."
		},
		{
			name: "newPrice",
			type: "input",
			message: "Enter price."
		},
		{
			name: "newQuantity",
			type: "input",
			message: "Enter quanity to add."
		}
		]).then(function(ans) {
			connection.query("INSERT INTO products SET ?",
			{
				product_name: ans.newProd,
				department_name: ans.newDept,
				price: ans.newPrice,
				stock_quantity: ans.newQuantity
			},
			function(err, res) {
				if (err) throw (err);
				console.log(res.affectedRows + " product added!");
				viewProducts();
			})
		})
}