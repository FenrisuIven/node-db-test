import { getUserDataFromUrlQuery } from "./utils/getUserDataFromUrlQuery";
import { ParsedUrlQuery } from "node:querystring";
import { queryTable } from "../utils/queryTable";
import { DBAction } from "../types/DBAction";
import { Message } from "../types/Message";
import { Client } from "pg";

export const addUserToDB:DBAction = async (
    client: Client,
    urlQuery: ParsedUrlQuery
) : Promise<Message> => {
    const userData = getUserDataFromUrlQuery(urlQuery);
    if ('status' in userData) { 
        return {
            status: userData.status,
            code: userData.code,
            msg: userData.msg
        }
    }
    const readRes = await queryTable(
        client,
        `INSERT INTO "user" VALUES(DEFAULT, '${
            Object.values(userData).join("', '")
        }')`
    );
    if ('status' in readRes) {
        return {
            status: readRes.status,
            code: readRes.code,
            msg: `No object matched the target query${readRes.msg ?
                ` (PG Error: ${readRes.msg.replace(/\\/g, '')})` : '' }`
        };
    }

    return {
        status: 200,
        msg: 'New user entry was added successfully'
    };
}
