// Part3 SQL Queries

import mysql from 'mysql2/promise';



const DBConfig = {
    host: "localhost",
    user: "root",
    password: "0000",
    database: "assignment5"
};


async function createConnection(DBConfig)
{
    try
    {
        return await mysql.createConnection(DBConfig);
    }
    catch (error)
    {
        console.log({ "Error connecting to DB": error });
        process.exit();
    }
}



//#region -- Creating Tables

async function createTables()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const createSuppliersTablesQuery =
            `
        CREATE TABLE Suppliers (
            supplier_id INT PRIMARY KEY AUTO_INCREMENT,
            supplier_name VARCHAR(50),
            contact_number VARCHAR(20)
        );`;
        const createProductsTablesQuery =
            `
        CREATE TABLE Products (
            product_id INT PRIMARY KEY AUTO_INCREMENT,
            product_name VARCHAR(100),
            price DECIMAL,
            stock_quantity INT,
            supplier_id INT,
            CONSTRAINT fk_products_suppliers Foreign Key (supplier_id) REFERENCES Suppliers (supplier_id)
        );`;
        const createSalesTablesQuery =
            `
        CREATE TABLE Sales (
            sales_id INT PRIMARY KEY AUTO_INCREMENT,
            product_id INT,
            quantity_sold INT,
            sale_date DATE DEFAULT(CURRENT_TIMESTAMP),
            CONSTRAINT fk_sales_products Foreign Key (product_id) REFERENCES Products (product_id)
        );`;

        const [SuppliersResult] = await connection.execute(createSuppliersTablesQuery);
        console.log({ "Suppliers table created successfully": SuppliersResult });
        const [ProductsResult] = await connection.execute(createProductsTablesQuery);
        console.log({ "Products table created successfully": ProductsResult });
        const [SalesResult] = await connection.execute(createSalesTablesQuery);
        console.log({ "Sales table created successfully": SalesResult });

    } catch (error)
    {
        console.log({ "error creating tables": error });
    }
    finally
    {
        connection.end();
    }
}

// await createTables();

//#endregion

//#region -- 2- Add a column “Category” to the Products table.

async function addColumn()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const addColumnQuery = `ALTER TABLE products ADD category INT;`;

        const [result] = await connection.execute(addColumnQuery);

        console.log({ "Column 'Category' added successfully": result });
    }
    catch (error)
    {
        console.log({ "Error adding column 'Category'": error });
    }
    finally
    {
        connection.end();
    }
}

// await addColumn();

//#endregion

//#region -- 3- Remove the “Category” column from Products.

async function removeColumn()
{
    const connection = await createConnection(DBConfig);
    try
    {
        const removeColumnQuery = `ALTER TABLE products DROP COLUMN category;`;

        const [result] = await connection.execute(removeColumnQuery);

        console.log({ "Column 'Category' removed successfully": result });
    }
    catch (error)
    {
        console.log({ "Error removing column 'Category'": error });
    }
    finally
    {
        connection.end();
    }
}

// await removeColumn();

//#endregion

//#region -- 4- Change “ContactNumber” column in Suppliers to VARCHAR (15).

async function changeColumn()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const changeColumnQuery =
            `
        ALTER TABLE suppliers
        CHANGE contact_number contact_number VARCHAR(15);`;

        const [result] = await connection.execute(changeColumnQuery);

        console.log({ "Column 'ContactNumber' changed successfully": result });
    }
    catch (error)
    {
        console.log({ "Error changing column 'ContactNumber'": error });
    }
    finally
    {
        connection.end();
    }
}

// await changeColumn();

//#endregion

//#region -- 5- Add a NOT NULL constraint to ProductName.

async function addConstraint()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const addConstraintQuery =
            `
        ALTER TABLE products
        CHANGE product_name product_name VARCHAR(100) NOT NULL;`;

        const [result] = await connection.execute(addConstraintQuery);

        console.log({ "NOT NULL constraint added successfully to ProductName": result });
    }
    catch (error)
    {
        console.log({ "Error adding constraint to 'ProductName'": error });
    }
    finally
    {
        connection.end();
    }
}

// await addConstraint()

//#endregion

//#region -- 6- Perform Basic Inserts:

async function insertData()
{
    const connection = await createConnection(DBConfig);

    //#region -- a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.

    try
    {
        const insertInSuppliersQuery =
            `
        INSERT INTO
            suppliers (supplier_name, contact_number)
        VALUES ('FreshFoods', '01001234567');`;

        const [result] = await connection.execute(insertInSuppliersQuery);

        console.log({ "Data inserted into 'Suppliers' successfully": result });

    }
    catch (error)
    {
        console.log({ "Error inserting data into 'Suppliers'": error });
        connection.end();
        process.exit();
    }
    //#endregion

    //#region -- b. Insert the following three products, all provided by 'FreshFoods':

    try
    {
        // getting the id of 'FreshFoods' supplier
        const getFreshFoodsIdQuery =
            `
        SELECT suppliers.supplier_id
        FROM suppliers
        WHERE supplier_name = 'FreshFoods';`;

        const [getIdResult] = await connection.execute(getFreshFoodsIdQuery);
        const FreshFoodsID = getIdResult[0].supplier_id;
        console.log({ FreshFoodsID });


        // inserting products provided by 'FreshFoods' data
        const insertInProductsQuery =
            `
        INSERT INTO
            products (
                product_name,
                price,
                stock_quantity,
                supplier_id
            )
        VALUES
            -- i. 'Milk' with a price of 15.00 and stock quantity of 50.
            ( ?, ?, ?, ${FreshFoodsID}),

            -- ii. 'Bread' with a price of 10.00 and stock quantity of 30.
            ( ?, ?, ?, ${FreshFoodsID}),
            
            -- iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
            ( ?, ?, ?, ${FreshFoodsID});`;

        const dataInserted = ['Milk', 15.00, 50, 'Bread', 10.00, 30, 'Eggs', 20.00, 40,];

        const [insertResult] = await connection.execute(insertInProductsQuery, dataInserted);

        console.log({ "Data inserted into 'Products' successfully": insertResult });
    }
    catch (error)
    {
        console.log({ "Error inserting data into 'Products'": error });
        connection.end();
        process.exit();
    }

    //#endregion

    //#region -- c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.

    try
    {
        // getting the id of 'Milk' product
        const getMilkIdQuery =
            `
        SELECT products.product_id
        FROM products
        WHERE product_name = 'Milk';`;

        const [getIdResult] = await connection.execute(getMilkIdQuery);
        const MilkID = getIdResult[0].product_id;
        console.log({ MilkID });


        // deducting the units sold from 'Products.quantity_sold' of the 'Milk'
        const unitsSoled = 2;
        const deductingSoldUnitsQuery =
            `
        UPDATE products
        SET
            stock_quantity = stock_quantity - 2
        WHERE
            product_id = ${MilkID}
            AND stock_quantity >= ${unitsSoled};`;

        const [deductingResult] = await connection.execute(deductingSoldUnitsQuery);
        if (!deductingResult.affectedRows)
        {
            console.log("Milk is out of stock");
            return;
        }

        // inserting sale of 2 units of 'Milk' made on '2025-05-20'

        const insertInSalesQuery =
            `
        INSERT INTO
            sales (
                product_id,
                quantity_sold,
                sale_date
            )
        VALUES (${MilkID}, ?, ?);`;

        const dataInserted = [2, '2025-05-20'];

        const [insertResult] = await connection.execute(insertInSalesQuery, dataInserted);

        console.log({ "Data inserted into 'Sales' successfully": insertResult });
    }
    catch (error)
    {
        console.log({ "Error inserting data into 'Sales'": error });
    }
    finally
    {
        connection.end();
    }

    //#endregion
}

// await insertData();

//#endregion

//#region -- 7- Update the price of 'Bread' to 25.00.

async function updateData()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const updatePriceQuery = `UPDATE products SET price = 25.00 WHERE product_name = 'Bread';`;

        const [result] = await connection.execute(updatePriceQuery);

        console.log({ "Price of 'Bread' updated successfully": result });
    }
    catch (error)
    {
        console.log({ "Error updating price of 'Bread'": error });
    }
    finally
    {
        connection.end();
    }
}

// await updateData();

//#endregion

//#region -- 8- Delete the product 'Eggs'.

async function deleteDate()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const deleteProductQuery = `DELETE FROM products WHERE product_name = 'Eggs';`;

        const [result] = await connection.execute(deleteProductQuery);

        if (!result.affectedRows)
        {
            console.log("Product 'Eggs' not found");
            return;
        }

        console.log({ "Delete 'Eggs' product successfully": result });
    }
    catch (error)
    {
        console.log({ "Error deleting 'Eggs' product": error });
    }
    finally
    {
        connection.end();
    }
}

// await deleteDate();

//#endregion

//#region -- 9- Retrieve the total quantity sold for each product.

async function retrieveData()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const retrieveDataQuery =
            `
        SELECT products.product_name, SUM(sales.quantity_sold)
        FROM products
            JOIN sales ON products.product_id = sales.product_id
        GROUP BY
            product_name;`;

        const [result] = await connection.execute(retrieveDataQuery);

        console.log({ "total quantity sold": result });
    }
    catch (error)
    {
        console.log({ "Error retrieving data": error });
    }
    finally
    {
        connection.end();
    }
}

// await retrieveData();

//#endregion

//#region -- 10-Get the product with the highest stock.

async function getProductData()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const getDataQuery =
            `
        SELECT products.product_name
        FROM products
        ORDER BY stock_quantity DESC
        LIMIT 1;`;

        const [result] = await connection.execute(getDataQuery);

        console.log({ "product with the highest stock": result });
    }
    catch (error)
    {
        console.log({ "Error getting product with the highest stock": error });
    }
    finally
    {
        connection.end();
    }
}

// await getProductData();

//#endregion

//#region -- 11- Find suppliers with names starting with 'F'

async function findSuppliersStartingWithF()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const findSuppliersQuery =
            `
        SELECT *
        FROM suppliers
        WHERE supplier_name LIKE 'F%';
        `;

        const [result] = await connection.execute(findSuppliersQuery);

        console.log({ "Suppliers starting with 'F'": result });
    }
    catch (error)
    {
        console.log({ "Error finding suppliers starting with 'F'": error });
    }
    finally
    {
        connection.end();
    }
}

// await findSuppliersStartingWithF();

//#endregion

//#region -- 12- Show all products that have never been sold

async function getUnsoldProducts()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const unsoldProductsQuery =
            `
        SELECT products.*
        FROM products
            LEFT JOIN sales
                ON products.product_id = sales.product_id
        WHERE sales.product_id IS NULL;
        `;

        const [result] = await connection.execute(unsoldProductsQuery);

        console.log({ "Products never sold": result });
    }
    catch (error)
    {
        console.log({ "Error retrieving unsold products": error });
    }
    finally
    {
        connection.end();
    }
}

// await getUnsoldProducts();

//#endregion

//#region -- 13- Get all sales along with product name and sale date

async function getSalesWithProductNames()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const salesWithProductsQuery =
            `
        SELECT products.product_name, sales.sale_date
        FROM sales
            LEFT JOIN products
                ON sales.product_id = products.product_id;
        `;

        const [result] = await connection.execute(salesWithProductsQuery);

        console.log({ "Sales with product names and dates": result });
    }
    catch (error)
    {
        console.log({ "Error retrieving sales with product names": error });
    }
    finally
    {
        connection.end();
    }
}

// await getSalesWithProductNames();

//#endregion

//#region -- 14- Create user "store_manager" and grant SELECT, INSERT, UPDATE

async function createUserAndGrantPermissions()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const createUserQuery =
            `
            CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
            IDENTIFIED BY 'store123';
            `;

        const grantPermissionsQuery =
            `
            GRANT SELECT, INSERT, UPDATE
            ON assignment5.*
            TO 'store_manager'@'localhost';
            `;

        await connection.execute(createUserQuery);
        await connection.execute(grantPermissionsQuery);

        console.log("User 'store_manager' created and permissions granted successfully");
    }
    catch (error)
    {
        console.log({ "Error creating user or granting permissions": error });
    }
    finally
    {
        connection.end();
    }
}

// await createUserAndGrantPermissions();

//#endregion

//#region -- 15- Revoke UPDATE permission from "store_manager"

async function revokeUpdatePermission()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const revokeUpdateQuery =
            `
            REVOKE UPDATE
            ON assignment5.*
            FROM 'store_manager'@'localhost';
            `;

        await connection.execute(revokeUpdateQuery);

        console.log("UPDATE permission revoked from 'store_manager'");
    }
    catch (error)
    {
        console.log({ "Error revoking UPDATE permission": error });
    }
    finally
    {
        connection.end();
    }
}

// await revokeUpdatePermission();

//#endregion

//#region -- 16- Grant DELETE permission on Sales table only

async function grantDeleteOnSales()
{
    const connection = await createConnection(DBConfig);

    try
    {
        const grantDeleteQuery =
            `
            GRANT DELETE
            ON assignment5.sales
            TO 'store_manager'@'localhost';
            `;

        await connection.execute(grantDeleteQuery);

        console.log("DELETE permission granted on 'Sales' table to 'store_manager'");
    }
    catch (error)
    {
        console.log({ "Error granting DELETE permission": error });
    }
    finally
    {
        connection.end();
    }
}

// await grantDeleteOnSales();

//#endregion





