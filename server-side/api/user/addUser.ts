import { IMessage } from "../interfaces/IMessage";
import { DBAction } from "../types/DBAction";
import {parseUrlQuery} from "../utils/parseUrlQuery";
import {queryTable} from "../utils/queryTable";
import {ParsedUrlQuery} from "node:querystring";
import {getUserDataFromUrlQuery} from "./utils/getUserDataFromUrlQuery";

export const addUserToDB:DBAction = async (
    client,
    req,
    urlQuery: ParsedUrlQuery
) : Promise<IMessage> => {
    const userData = getUserDataFromUrlQuery(urlQuery);
    
    /*const readRes = await queryTable(
        client,
        `INSERT INTO "${urlQuery.table}" VALUES(${})`
    );

    if ('status' in readRes) {
        return {
            status: readRes.status,
            code: readRes.code,
            msg: `No object matched the target query${readRes.msg ?
                ` (PG Error: ${readRes.msg.replace(/\\/g, '')})` : '' }`
        };
    }*/
    console.log({userData});

    if ('status' in userData) {
        return userData;
    } else {
        return {
            status: 200,
            json: userData
        };
    }
}