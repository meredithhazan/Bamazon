# Bamazon
Storefront application using MySQL, Node.js, and Inquirer

We begin with a MySQL database of products for sale.
![Screenshot of starting database](images/Screen_Shot1_db.png)

## Customer User Flow

1. Customer is shown a table of products available, including:
	* `Item ID`
	* `Product Name`
	* `Price`

2. Using the Node.js module Inquirer, customer is asked for their order.
![Screenshot of landing page](images/Screen_Shot2_start.png)

3. If the quantity of the item requested is more than what's in stock, the customer is informed and asked to start over.
![Screenshot of insufficient stock message](images/Screen_Shot3_stock.png)	

4. If sufficient stock is available, the order is filled and customer is given a total amount.
![Screenshot of finished order](images/Screen_Shot4_ordered.png)

The database is updated on the back end as seen in this example:
![Screenshot of updated database](images/Screen_Shot5_newdb.png)