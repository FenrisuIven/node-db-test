import { parseUrlQuery } from "../utils/parseUrlQuery";
import { queryTable } from "../utils/queryTable";
import { IMessage } from "../interfaces/IMessage";
import { DBAction } from "../types/DBAction";
import {ParsedUrlQuery} from "node:querystring";

const getUserFromDB:DBAction = async (
    client, 
    req,
    urlQuery: ParsedUrlQuery
) : Promise<IMessage> => {
    const readRes = await queryTable(
        client, 
        `SELECT * FROM "${urlQuery.table}"`
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
        json: JSON.stringify(readRes.rows)
    };
}

export {
    getUserFromDB
}
