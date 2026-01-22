import { Router } from "express";
import { addColumn, addConstraint, changeColumn, createTables, deleteProduct, findSuppliersStartingWithF, getHighestStock, getSalesWithProductNames, getUnsoldProducts, insertProducts, insertSales, insertSupplier, removeColumn, retrieveTotal, updateData } from "./retail.service.js";
import { ResponseError } from "../../util/ResponseError.js";


export const retailRouter = Router();


//#region -- 1- Creating Tables
retailRouter.post("/create-tables", async (req, res) =>
{
    try
    {
        const result = await createTables();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/create-tables", "Error creating tables");
    }
});
//#endregion

//#region -- 2- Add a column “Category” to the Products table.

retailRouter.post("/add-column", async (req, res) =>
{
    try
    {
        const result = await addColumn();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/add-column", "Error adding column 'Category'");
    }
});

//#endregion

//#region -- 3- Remove the “Category” column from Products.

retailRouter.delete("/remove-column", async (req, res) =>
{
    try
    {
        const result = await removeColumn();
        res.status(200).json(result);
    }
    catch (error)
    {
        console.log({ "Error removing column 'Category'": error });
        throw new ResponseError(error, "/retail/remove-column", "Error removing column 'Category'");
    }
});

//#endregion

//#region -- 4- Change “ContactNumber” column in Suppliers to VARCHAR (15).

retailRouter.patch("/change-column", async (req, res) =>
{
    try
    {
        const result = await changeColumn();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/change-column", "Error changing column 'ContactNumber'");
    }
});

//#endregion

//#region -- 5- Add a NOT NULL constraint to ProductName.

retailRouter.patch("/add-constraint", async (req, res) =>
{
    try
    {
        const result = await addConstraint();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/add-constraint", "Error adding constraint to 'ProductName'");
    }

});

//#endregion

//#region -- 6- Perform Basic Inserts:

//#region -- a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
retailRouter.post("/insert/supplier", async (req, res) =>
{
    try
    {
        const result = await insertSupplier();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/insert/supplier", "Error inserting data into 'Suppliers'");
    }
});

//#endregion

//#region -- b. Insert the following three products, all provided by 'FreshFoods':

retailRouter.post("/insert/products", async (req, res) =>
{
    try
    {
        const result = await insertProducts();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/insert/products", "Error inserting data into 'Products'");
    }
});

//#endregion

//#region -- c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.

retailRouter.post("/insert/sales", async (req, res) =>
{
    try
    {
        const result = await insertSales();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/insert/sales", "Error inserting data into 'Sales'");
    }

});

//#endregion

//#endregion

//#region -- 7- Update the price of 'Bread' to 25.00.

retailRouter.patch("/update-data", async (req, res) =>
{
    try
    {
        const result = await updateData();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/update-data", "Error updating price of 'Bread'");
    }
});

//#endregion

//#region -- 8- Delete the product 'Eggs'.

retailRouter.delete("/delete-product", async (req, res) =>
{
    try
    {
        const result = await deleteProduct();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/delete-product", "Error deleting 'Eggs' product");
    }
});

//#endregion

//#region -- 9- Retrieve the total quantity sold for each product.

retailRouter.get("/retrieve-total-q-sold", async (req, res) =>
{
    try
    {
        const result = await retrieveTotal();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/retrieve-total-q-sold", "Error retrieving total quantity sold");
    }
});

//#endregion

//#region -- 10- Get the product with the highest stock.

retailRouter.get("/get-highest-stock", async (req, res) =>
{
    try
    {
        const result = await getHighestStock();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/get-highest-stock", "Error getting product with the highest stock");
    }
});

//#endregion

//#region -- 11- Find suppliers with names starting with 'F'

retailRouter.get("/suppliers-starting-with-f", async (req, res) =>
{
    try
    {
        const result = await findSuppliersStartingWithF();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/suppliers-starting-with-f", "Error finding suppliers starting with 'F'");
    }
});

//#endregion

//#region -- 12- Show all products that have never been sold

retailRouter.get("/unsold-products", async (req, res) =>
{
    try
    {
        const result = await getUnsoldProducts();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/unsold-products", "Error retrieving unsold products");
    }

});

//#endregion

//#region -- 13- Get all sales along with product name and sale date

retailRouter.get("/sales-with-product-names", async (req, res) =>
{
    try
    {
        const result = await getSalesWithProductNames();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/retail/sales-with-product-names", "Error retrieving sales with product names");
    }
});

//#endregion



