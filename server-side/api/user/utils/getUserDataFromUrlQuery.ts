import {IUserData} from "../../interfaces/IUserData";
import {ParsedUrlQuery} from "node:querystring";

import crypto from 'crypto';
import {errorMessages} from "../../constants/errorMessages";
import {IMessage} from "../../interfaces/IMessage";

export function getUserDataFromUrlQuery(
    urlQuery: ParsedUrlQuery
) : IUserData | IMessage{
    try {
        console.log(Object.keys(urlQuery).length)
        if (Object.keys(urlQuery).length < 4) {
            throw new TypeError(errorMessages.TOO_FEW_ARGS_USER);
        }
        if (Object.values(urlQuery)
            .map(elem => typeof elem).slice(1)
            .find(providedType => providedType !== 'string')) {
            throw new TypeError(errorMessages.TYPE_MISMATCH);
        }
        console.log('mkay')
        return {
            id: Number(urlQuery.id),
            username: urlQuery.user as string || '',
            email: urlQuery.email as string || '',
            password: crypto.createHash('md5').update(urlQuery.password as string).digest('hex')
        };
    } catch (err: any) {
        let [ errorType, ...errorMessage ] = err.toString().split(' ');
        errorType = errorType.slice(0, errorType.length - 1);
        return {
            status: 400,
            code: errorType,
            msg: errorMessage.join(' ')
        };
    }
}