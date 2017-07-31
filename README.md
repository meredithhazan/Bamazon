# Bamazon
Storefront Node application using MySQL and Inquirer

We begin with a MySQL database of products for sale.

![Screenshot of starting database](./images/Screen_Shot1_db.png)

## Customer User Flow

1. Customer is shown a table of products available, including:
	* `Item ID`
	* `Product Name`
	* `Price`

2. Using the Node.js module Inquirer, customer is asked for their order.
![Screenshot of landing page](images/Screen_Shot2_start.png)

3. If the quantity of the item requested is more than what's in stock, the customer is informed and asked to start 
over.
![Screenshot of insufficient stock message](./images/Screen_Shot3_stock.png)	

4. If sufficient stock is available, the order is filled and customer is given a total amount.
![Screenshot of finished order](./images/Screen_Shot4_ordered.png)

The database is updated on the back end as seen in this example:
![Screenshot of updated database](./images/Screen_Shot5_newdb.png)

## Manager User Flow

1. Manager is shown a set of menu options:
	* `View Products for Sale`
	* `View Low Inventory`
	* `Add to Inventory`
	* `Add New Product`

2. When `View Products for Sale` is selected, every item from the MySQL database is shown, including:
	* `Item ID`
	* `Product Name`
	* `Department Name`
	* `Price`
	* `Stock Quantity`

3. When `View Low Inventory` is selected, only items from the database with inventory below 5 will be shown.

4. When `Add to Inventory` is selected, prompts are displayed allowing the manager to add stock of any item currently in the store.

5. When `Add New Product` is selected, the manager is prompted to add a completely new product to the store.

6. Once each operation has been completed, the manager is asked whether they'd like to do anything else.
	* If response is yes, menu is shown again.
	* If response is no, the session is terminated.

View a demo of the Manager application below -
![Application demo](./images/bamazonManager-demo.gif)	