import { IncomingMessage, ServerResponse } from "node:http";
import { returnServerResponse } from "./utils/returnServerResponse";
import { setupConnection } from "./setup/dbSetub";
import { dbCredentials } from "./setup/dbCredentials";
import { DBAction } from "./types/DBAction";
import { parseUrlQuery } from "./utils/parseUrlQuery";

export async function handleRequest(
    req: IncomingMessage, 
    res: ServerResponse, 
    callback: DBAction
) {
    const client = await setupConnection(dbCredentials);
    if ('status' in client){
        client.msg = `There was an error connecting to the DataBase`;
        console.log(client)
        returnServerResponse(client, res);
        return;
    }

    const parsedUrlQuery = parseUrlQuery(req);
    if ('status' in parsedUrlQuery) {
        returnServerResponse(parsedUrlQuery, res);
        return;
    }
    
    const data = await callback(client, req, parsedUrlQuery);
    returnServerResponse(data, res);
}