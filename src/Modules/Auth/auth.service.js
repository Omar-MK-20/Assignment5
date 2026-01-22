import { connection } from "../../DBConnection.js";

export async function createUserAndGrantPermissions()
{
    const createUserQuery =
        `
            CREATE USER 'store_manager'@'localhost'
            IDENTIFIED BY 'store123';
            `;

    const grantPermissionsQuery =
        `
            GRANT SELECT, INSERT, UPDATE
            ON assignment5.*
            TO 'store_manager'@'localhost';
            `;

    const [createResult] = await connection.execute(createUserQuery);
    const [grantResult] = await connection.execute(grantPermissionsQuery);

    return { message: "User 'store_manager' created and permissions granted successfully", createResult, grantResult };
}

export async function revokeUpdatePermission()
{
    const revokeUpdateQuery =
        `
            REVOKE UPDATE
            ON assignment5.*
            FROM 'store_manager'@'localhost';
            `;

    const [result] = await connection.execute(revokeUpdateQuery);

    return { message: "UPDATE permission revoked from 'store_manager'", result };
}

export async function grantDeleteOnSales()
{

    const grantDeleteQuery =
        `
            GRANT DELETE
            ON assignment5.sales
            TO 'store_manager'@'localhost';
            `;

    const [result] = await connection.execute(grantDeleteQuery);

    console.log();
    return { message: "DELETE permission granted on 'Sales' table to 'store_manager'", result };

}
