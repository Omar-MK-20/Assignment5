import mysql from "mysql2/promise";

async function createConnection(DBConfig)
{
    try
    {
        const connection = await mysql.createConnection(DBConfig);
        await connection.connect();
        console.log("DB connected successfully");
        return connection;
    }
    catch (error)
    {
        console.log({ "Error connecting to DB": error });
        process.exit();
    }
}



const DBConfig = {
    host: "localhost",
    user: "root",
    password: "0000",
    database: "assignment5"
};



export const connection = await createConnection(DBConfig);
