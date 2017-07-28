DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(2,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);
SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("necklace displays", "merchandising", 6.50, 8);

