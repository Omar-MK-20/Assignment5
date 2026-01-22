import { connection } from "../../DBConnection.js";

export async function createTables()
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
    const [ProductsResult] = await connection.execute(createProductsTablesQuery);
    const [SalesResult] = await connection.execute(createSalesTablesQuery);

    return { message: "Tables created successfully", SuppliersResult, ProductsResult, SalesResult };
}

export async function addColumn()
{

    const addColumnQuery = `ALTER TABLE products ADD category INT;`;

    const [result] = await connection.execute(addColumnQuery);

    return { message: "Column 'Category' added successfully", result };

}

export async function removeColumn()
{

    const removeColumnQuery = `ALTER TABLE products DROP COLUMN category;`;

    const [result] = await connection.execute(removeColumnQuery);

    return { message: "Column 'Category' removed successfully", result };

}

export async function changeColumn()
{
    const changeColumnQuery =
        `
        ALTER TABLE suppliers
        CHANGE contact_number contact_number VARCHAR(15);`;

    const [result] = await connection.execute(changeColumnQuery);

    return { message: "Column 'ContactNumber' changed successfully", result };
}

export async function addConstraint()
{

    const addConstraintQuery =
        `
        ALTER TABLE products
        CHANGE product_name product_name VARCHAR(100) NOT NULL;`;

    const [result] = await connection.execute(addConstraintQuery);

    return { message: "NOT NULL constraint added successfully to ProductName", result };

}

export async function insertSupplier()
{
    const insertInSuppliersQuery =
        `
        INSERT INTO
            suppliers (supplier_name, contact_number)
        VALUES ('FreshFoods', '01001234567');`;

    const [result] = await connection.execute(insertInSuppliersQuery);

    return { message: "Data inserted into 'Suppliers' successfully", result };
}

export async function insertProducts()
{
    // getting the id of 'FreshFoods' supplier
    const getFreshFoodsIdQuery =
        `
        SELECT suppliers.supplier_id
        FROM suppliers
        WHERE supplier_name = 'FreshFoods';`;

    const [getIdResult] = await connection.execute(getFreshFoodsIdQuery);
    const FreshFoodsID = getIdResult[0].supplier_id;
    // console.log({ FreshFoodsID });


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

    return { message: "Data inserted into 'Products' successfully", insertResult };
}

export async function insertSales()
{
    // getting the id of 'Milk' product
    const getMilkIdQuery =
        `
        SELECT products.product_id
        FROM products
        WHERE product_name = 'Milk';`;

    const [getIdResult] = await connection.execute(getMilkIdQuery);
    const MilkID = getIdResult[0].product_id;
    // console.log({ MilkID });


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
        throw new Error("Milk is out of stock");
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

    return { message: "Data inserted into 'Sales' successfully", insertResult };
}

export async function updateData()
{
    const updatePriceQuery = `UPDATE products SET price = 25.00 WHERE product_name = 'Bread';`;

    const [result] = await connection.execute(updatePriceQuery);

    return { message: "Price of 'Bread' updated successfully", result };
}

export async function deleteProduct()
{
    const deleteProductQuery = `DELETE FROM products WHERE product_name = 'Eggs';`;

    const [result] = await connection.execute(deleteProductQuery);

    if (!result.affectedRows)
    {
        throw new Error("Product 'Eggs' not found", { cause: { status: 404 } });
    }

    return { message: "Delete 'Eggs' product successfully", result };
}

export async function retrieveTotal()
{
    const retrieveDataQuery =
        `
        SELECT products.product_name, SUM(sales.quantity_sold)
        FROM products
            JOIN sales ON products.product_id = sales.product_id
        GROUP BY
            product_name;`;

    const [result] = await connection.execute(retrieveDataQuery);

    return { "total quantity sold": result };
}

export async function getHighestStock()
{
    const getDataQuery =
        `
        SELECT products.product_name
        FROM products
        ORDER BY stock_quantity DESC
        LIMIT 1;`;

    const [result] = await connection.execute(getDataQuery);

    return { "product with the highest stock": result };

}

export async function findSuppliersStartingWithF()
{
    const findSuppliersQuery =
        `
        SELECT *
        FROM suppliers
        WHERE supplier_name LIKE 'F%';
        `;

    const [result] = await connection.execute(findSuppliersQuery);

    return { "Suppliers starting with 'F'": result };
}

export async function getUnsoldProducts()
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

    return { "Products never sold": result };
}

export async function getSalesWithProductNames()
{
    const salesWithProductsQuery =
        `
        SELECT products.product_name, sales.sale_date
        FROM sales
            LEFT JOIN products
                ON sales.product_id = products.product_id;
        `;

    const [result] = await connection.execute(salesWithProductsQuery);

    return { "Sales with product names and dates": result };
}