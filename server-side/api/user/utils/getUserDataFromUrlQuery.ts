import { UserData } from "../../types/UserData";
import { ParsedUrlQuery } from "node:querystring";

import crypto from 'crypto';
import { errorMessages } from "../../constants/errorMessages";
import { Message } from "../../types/Message";
import {formatErrorToMessage} from "../../utils/formatErrorToMessage";

export function getUserDataFromUrlQuery(
    urlQuery: ParsedUrlQuery
) : UserData | Message {
    try {
        console.log(Object.keys(urlQuery).length)
        if (Object.keys(urlQuery).length < 4) {
            throw new TypeError(errorMessages.TOO_FEW_ARGS_USER);
        }
        
        // TODO: Most likely, urlQuery already contains data in needed format, this much logic is not necessary;
        //       Try to shorthand it. It might be possible to use Object.keys(urlQuery) for this.

        console.log(urlQuery);
        
        const values = Object.values(urlQuery);
        const valueOfIncorrectType = values.map((elem: any) => typeof elem).slice(1)
            .find((providedType: string) => providedType !== 'string');
        if (valueOfIncorrectType) {
            throw new TypeError(errorMessages.TYPE_MISMATCH);
        }
        
        return {
            id: Number(urlQuery.id),
            username: urlQuery.user,
            email: urlQuery.email,
            password: crypto.createHash('md5').update(urlQuery.password).digest('hex')
        };
    } catch (err: any) {
        return formatErrorToMessage(err);
    }
}