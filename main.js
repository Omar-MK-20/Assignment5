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

        console.log({ "Column 'ContactNumber' changed successfully": result});
    }
    catch (error)
    {
        console.log({ "Error changing column 'ContactNumber'": error });
    }
    finally
    {
        connection.end()
    }
}

// await changeColumn();

//#endregion













