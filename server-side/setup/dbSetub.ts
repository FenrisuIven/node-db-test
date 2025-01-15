import { dbCredentials } from "./dbCredentials";
import pg from "pg";

async function setupConnection(
    configuration?: {
        user: string,
        password: string,
        database: string
    }
) {
    const defaultDBCredentials = dbCredentials;
    if (!configuration || Object.keys(configuration).length === 0) {
        configuration = defaultDBCredentials;
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