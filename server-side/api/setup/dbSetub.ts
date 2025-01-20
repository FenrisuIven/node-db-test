import { CredentialsConfig } from "../types/CredentialsConfig";
import { dbCredentials } from "./dbCredentials";
import { Message } from "../types/Message";

import pg from "pg";

async function setupConnection(
    configuration?: CredentialsConfig
) :  Promise<pg.Client | Message> {
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