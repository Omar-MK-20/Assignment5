// Part3 SQL Queries

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "assignment5"
});



//#region -- Creating database

const createTablesQuery =
    `
CREATE TABLE Suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(50),
    contact_number VARCHAR(20)
);
`;

connection.execute(createTablesQuery, (error, result) =>
{
    if (error)
    {
        console.log({ "error creating tables": error });
        return;
    }

    console.log({ "tables created successfully": result });
});





connection.connect((error) =>
{
    if (error)
    {
        console.log({ error });
        return;
    }
    console.log(`DB connected`);
});
