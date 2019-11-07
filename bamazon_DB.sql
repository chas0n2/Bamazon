DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE Products (
    item_id INT(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM Products;

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity)
VALUES (20, "RTX 2080 ti", "Gaming", 1250.99, 15),
       (35, "ASUS TUF GT501", "Gaming", 169.99, 12),
       (45, "ASUS AMD AM4 ROG Strix X570-F", "Workstation", 299.99, 15),
       (55, "CORSAIR 1200 POWER SUPPLY", "Workstation", 300.00, 5),
       (65, "G-SKILL 3600MHZ DDR4 32GB", "Workstation", 175.00, 9),
       (75, "AMD RYZEN 7 3700X", "Workstation", 329.99, 5),
       (85, "INTEL CORE i9 9900KS", "Gaming", 692.99, 3),
       (95, "ASUS ROG MAXIMUS XI Hero Z390", "Gaming", 281.99, 6),
       (105, "1TB NVMe Gen4 SSD", "Workstation", 199.99, 4),
       (115, "Asus ROG 27 4k 144HZ", "Gaming", 1300.00, 2)