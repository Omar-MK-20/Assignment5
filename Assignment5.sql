-- Active: 1766933187103@@127.0.0.1@3306@assignment5

-- Creating database
CREATE DATABASE Assignment5;

-- DROP DATABASE assignment5;

USE assignment5;

CREATE TABLE Suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(50),
    contact_number VARCHAR(20)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    price DECIMAL,
    stock_quantity INT,
    supplier_id INT,
    CONSTRAINT fk_products_suppliers Foreign Key (supplier_id) REFERENCES Suppliers (supplier_id)
);

CREATE TABLE Sales (
    sales_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity_sold INT,
    sale_date DATE DEFAULT(CURRENT_TIMESTAMP),
    CONSTRAINT fk_sales_products Foreign Key (product_id) REFERENCES Products (product_id)
);

-- 2- Add a column “Category” to the Products table.
ALTER TABLE products ADD category INT;

-- 3- Remove the “Category” column from Products.
ALTER TABLE products DROP COLUMN category;

-- 4- Change “ContactNumber” column in Suppliers to VARCHAR (15).
ALTER TABLE suppliers
CHANGE contact_number contact_number VARCHAR(15);

-- 5- Add a NOT NULL constraint to ProductName.
ALTER TABLE products
CHANGE product_name product_name VARCHAR(100) NOT NULL;

-- 6- Perform Basic Inserts:
-- a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
INSERT INTO
    suppliers (supplier_name, contact_number)
VALUES ('FreshFoods', '01001234567');

-- b. Insert the following three products, all provided by 'FreshFoods':
SELECT suppliers.supplier_id INTO @FreshFoods_id
FROM suppliers
WHERE
    supplier_name = 'FreshFoods';

SELECT @FreshFoods_id;

INSERT INTO
    products (
        product_name,
        price,
        stock_quantity,
        supplier_id
    )
VALUES
    -- i. 'Milk' with a price of 15.00 and stock quantity of 50.
    (
        'Milk',
        15.00,
        50,
        @FreshFoods_id
    ),
    -- ii. 'Bread' with a price of 10.00 and stock quantity of 30.
    (
        'Bread',
        10.00,
        30,
        @FreshFoods_id
    ),
    -- iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
    (
        'Eggs',
        20.00,
        40,
        @FreshFoods_id
    );

-- c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
SELECT products.product_id INTO @Milk_id
FROM products
WHERE
    product_name = 'Milk';

SELECT @Milk_id;

INSERT INTO
    sales (
        product_id,
        quantity_sold,
        sale_date
    )
VALUES (@Milk_id, 2, '2025-05-20');

UPDATE products
SET
    stock_quantity = stock_quantity - 2
WHERE
    product_id = @Milk_id
    AND stock_quantity >= 2;

-- 7- Update the price of 'Bread' to 25.00.
UPDATE products SET price = 25.00 WHERE product_name = 'Bread';

-- 8- Delete the product 'Eggs'.
DELETE FROM products WHERE product_name = 'Eggs';

-- 9- Retrieve the total quantity sold for each product.
SELECT products.product_name, SUM(sales.quantity_sold)
FROM products
    JOIN sales
WHERE
    products.product_id = sales.product_id
GROUP BY
    product_name;

-- 10-Get the product with the highest stock.
SELECT products.product_name FROM products ORDER BY