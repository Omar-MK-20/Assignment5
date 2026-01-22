import express from "express";
import { retailRouter } from "./Modules/Retail/retail.controller.js";
import { ResponseError } from "./util/ResponseError.js";
import { authRouter } from "./Modules/Auth/auth.controller.js";


export async function bootstrap()
{
    const port = 3000;

    const server = express();

    server.use(express.json());

    server.use("/retail", retailRouter);

    server.use("/auth", authRouter);

    server.use((err, req, res, next) =>
    {
        if (err instanceof ResponseError)
        {
            res.status(err.status).json({ path: err.path, reason: err.reason, message: err.message, stack: err.stack, err });
        }
        else
        {
            res.status(500).json({ err, message: err.message, stack: err.stack });
        }
    });

    server.use((req, res, next) =>
    {
        res.status(404).send({ error: 'Sorry, the url you are looking for cannot be found!' });
    });

    server.listen(port, (err) =>
    {
        if (err)
        {
            console.log(err);
            process.exit();
        }
        console.log(`Server is running on port :: ${port}`);
    });
}
