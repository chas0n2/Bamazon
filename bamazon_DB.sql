DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE Products (
    id INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(35) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (id)
);
