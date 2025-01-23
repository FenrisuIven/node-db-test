import { formatErrorToMessage } from "../utils/formatErrorToMessage";
import { ParsedUrlQuery } from "node:querystring";
import { queryTable } from "../utils/queryTable";
import { DBAction } from "../types/DBAction";
import { Message } from "../types/Message";
import { Client } from "pg";

export const getUserFromDB:DBAction = async (
    client: Client, 
    urlQuery: ParsedUrlQuery
) : Promise<Message> => {
    try {
        const readRes = await queryTable(
            client,
            `SELECT * FROM "${urlQuery.table}"`
        );
        if ('status' in readRes) {
            return {
                status: readRes.status,
                code: readRes.code,
                msg: `Bad query${readRes.msg ?
                    `\nPG Error: ${readRes.msg.replace(/\\/g, '')}` : '' }`
            };
        }
        return {
            status: 200,
            json: JSON.stringify(readRes.rows)
        };
    } catch(err: any) {
        return formatErrorToMessage(err);
    }
}
