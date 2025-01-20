import { parseUrlQuery } from "../utils/parseUrlQuery";
import { queryTable } from "../utils/queryTable";
import { Message } from "../types/Message";
import { DBAction } from "../types/DBAction";
import {ParsedUrlQuery} from "node:querystring";
import {read} from "node:fs";
import {formatErrorToMessage} from "../utils/formatErrorToMessage";

export const getUserFromDB:DBAction = async (
    client, 
    req,
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
