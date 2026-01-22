import { Router } from "express";
import { ResponseError } from "../../util/ResponseError.js";
import { createUserAndGrantPermissions, grantDeleteOnSales, revokeUpdatePermission } from "./auth.service.js";


export const authRouter = Router();

//#region -- 14- Create user "store_manager" and grant SELECT, INSERT, UPDATE

authRouter.post("/create-user", async (req, res) =>
{
    try
    {
        const result = await createUserAndGrantPermissions();
        res.status(201).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/auth/create-user", "Error creating user or granting permissions");
    }
});

//#endregion

//#region -- 15- Revoke UPDATE permission from "store_manager"

authRouter.patch("/revoke-permission", async (req, res) =>
{
    try
    {
        const result = await revokeUpdatePermission();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/auth/revoke-permission", "Error revoking UPDATE permission");
    }
});

//#endregion

//#region -- 16- Grant DELETE permission on Sales table only

authRouter.patch("/grant-permission", async (req, res) =>
{
    try
    {
        const result = await grantDeleteOnSales();
        res.status(200).json(result);
    }
    catch (error)
    {
        throw new ResponseError(error, "/auth/Grant-permission", "Error granting DELETE permission");
    }
});

//#endregion









