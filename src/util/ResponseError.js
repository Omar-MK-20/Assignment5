export class ResponseError extends Error
{
    /**
     * 
     * @param {Error} error
     * @param {string} path
     * @param {string} reason
     * @param {number} status - default value `500`
     */
    constructor(error, path, reason)
    {
        console.log(error.cause);
        super(error.message);
        this.name = "Custom Response Error";
        this.stack = error.stack;
        this.path = path;
        this.code = error.code;
        this.reason = reason;
        this.status = error.cause?.status ?? 500;
    }
}