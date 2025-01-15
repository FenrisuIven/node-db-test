import { errorMessages } from '../constants/errorMessages';
import { IMessage } from "../interfaces/IMessage";
import { DBAction } from "../types/DBAction";

import querystring from 'querystring';
import url from 'url';

const getUserFromDB:DBAction = async (
    client, 
    req
) : Promise<IMessage> => {
    if (!req.url) {
        throw new Error(errorMessages.NULL_URL);
    }
    
    const providedUrlQuery = url.parse(req.url).query;
    if (!providedUrlQuery) {
        throw new Error(errorMessages.NULL_QUERY);
    }
    const parsedUrlQuery = querystring.parse(providedUrlQuery) || '';
    if (Object.keys(parsedUrlQuery).length === 0) {
        throw new Error(errorMessages.INVALID_QUERY);
    }    
    
    const readRes = await client.query(`SELECT * FROM "${parsedUrlQuery.table}"`)
        .catch(err => {
            const errorMessage: IMessage = {
                status: 404,
                code: err.code,
                msg: err.toString().slice(7)
            };
            return errorMessage;
        })
    
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
