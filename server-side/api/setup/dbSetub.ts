import { ICredentialsConfig } from "../interfaces/ICredentialsConfig";
import { dbCredentials } from "./dbCredentials";
import { IMessage } from "../interfaces/IMessage";

import pg from "pg";

async function setupConnection(
    configuration?: ICredentialsConfig
) :  Promise<pg.Client | IMessage> {
    if (!configuration || Object.keys(configuration).length === 0) {
        configuration = dbCredentials;
    }
    const { Client } = pg;
    const client = new Client(configuration);
    const connectionRes = await client.connect().catch(err => err);

    return connectionRes ? {
        status: 502,
        code: connectionRes.code
    } : client
}

export {
    setupConnection
}