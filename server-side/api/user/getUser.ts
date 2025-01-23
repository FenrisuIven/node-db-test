import { formatErrorToMessage } from "../utils/formatErrorToMessage";
import { ParsedUrlQuery } from "node:querystring";
import { queryTable } from "../utils/queryTable";
import { DBAction } from "../types/DBAction";
import { Message } from "../types/Message";
import { Client } from "pg";
import {errorMessages} from "../constants/errorMessages";

export const getUserFromDB:DBAction = async (
    client: Client, 
    urlQuery: ParsedUrlQuery
) : Promise<Message> => {
    try {
        if (!('id' in urlQuery)) {
            return formatErrorToMessage(new Error(errorMessages.NULL_ID));
        }
        const readRes = await queryTable(
            client,
            `SELECT * FROM "user" t WHERE t.id = ${urlQuery.id}`
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
