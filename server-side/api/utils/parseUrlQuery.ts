import { IncomingMessage } from "node:http";
import { errorMessages } from "../constants/errorMessages";

import url from "url";
import querystring from "querystring";
import {ParsedUrlQuery} from "node:querystring";
import {Message} from "../types/Message";
import {formatErrorToMessage} from "./formatErrorToMessage";

export function parseUrlQuery (
    req: IncomingMessage
): ParsedUrlQuery | Message {
    try {
        if (!req.url) {
            throw new TypeError(errorMessages.NULL_URL);
        }

        const providedUrlQuery = url.parse(req.url).query;
        if (!providedUrlQuery) {
            throw new TypeError(errorMessages.NULL_QUERY);
        }

        const parsedUrlQuery = querystring.parse(providedUrlQuery) || '';
        if (Object.keys(parsedUrlQuery).length === 0) {
            throw new TypeError(errorMessages.INVALID_QUERY);
        }
        return parsedUrlQuery;
    } catch(err: any) {
        return formatErrorToMessage(err);
    }
}