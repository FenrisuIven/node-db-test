import { IncomingMessage } from "node:http";
import { errorMessages } from "../constants/errorMessages";

import url from "url";
import querystring from "querystring";

export function parseUrlQuery (
    req: IncomingMessage
) {
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
    
    return parsedUrlQuery;
}