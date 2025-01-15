import { IncomingMessage, ServerResponse } from "node:http";
import { setupConnection } from "./setup/dbSetub";
import { dbCredentials } from "./setup/dbCredentials";
import { DBAction } from "./types/DBAction";

export async function handleRequest(
    req: IncomingMessage, 
    res: ServerResponse, 
    callback: DBAction
) {
    const client = await setupConnection(dbCredentials);
    if ('status' in client){
        res.statusCode = client.status;
        res.end(JSON.stringify({
            code: client.code,
            msg: `${client.status}: There was an error connecting to the DataBase`
        }));
        return;
    }
    const data = await callback(client, req);
    const returnValue = (() => {
        if(data.status > 400) {
            return JSON.stringify(`${data.status}: ${data.msg} [${data.code}]`);
        } else {
            return typeof data.json === 'string' ? data.json : JSON.stringify(data.json);
        }
    })();
    res.statusCode = data.status;
    res.end(returnValue);
}