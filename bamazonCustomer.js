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
	connection.query("SELECT * FROM products", function(err, res, fields) {
    if (err) throw (err);
    console.log("Item ID | Product Name | Price");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
    };
    console.log("-----------------------------------");
    placeOrder();
	});
}

function placeOrder() {
    inquirer.
		prompt ([
		{
			name: "choiceId",
			type: "input",
			message: "To purchase, please enter a product id.",
			validate: function(value) {
          		if (isNaN(value) === false) {
            		return true;
          		}
          			return false;
        		}

		},
		{
			name: "quantity",
			type: "input",
			message: "How many would you like?",
			validate: function(value) {
          		if (isNaN(value) === false) {
            		return true;
          		}
          			return false;
        		}
		}
		]).then(function(ans) {
			//console.log("Customer cart: ", ans.choiceId, ans.quantity);
			var chosenItem;
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw (err);
				for (var i = 0; i < res.length; i++) {
					if (res[i].item_id === parseInt(ans.choiceId)) {
      					chosenItem = res[i];
      				};
    			};	
      			//console.log("chosen item is ", chosenItem);
      			if (parseInt(ans.quantity) > chosenItem.stock_quantity) {
      				console.log("Sorry, insufficient stock available. Try again.");
      				placeOrder();
      			} else {
      				//console.log("Updating stock...\n");
      				var newStock = chosenItem.stock_quantity - parseInt(ans.quantity);
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
      						console.log("Thank you for your order!");
      						var orderTotal = chosenItem.price * parseInt(ans.quantity);
      						console.log("Your order total is: $",orderTotal);
      
      					})
      			};
     	
    				
			});
      	})
}		

