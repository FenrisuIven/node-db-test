import crypto from 'crypto';
import { ZodError } from 'zod';
import { ParsedUrlQuery } from "node:querystring";

import { formatErrorToMessage } from "../../utils/formatErrorToMessage";
import { userDataSchema } from "../validation/UserSchema";
import { UserData } from "../type/UserData";
import { errorMessages } from "../../constants/errorMessages";
import { Message } from "../../types/Message";

export function getUserDataFromUrlQuery(
    urlQuery: ParsedUrlQuery
) : UserData | Message {
    try {
        if (Object.keys(urlQuery).length < 3) {
            throw new TypeError(errorMessages.TOO_FEW_ARGS_USER);
        }
        
        const validationRes: UserData = userDataSchema.parse({
            ...urlQuery
        });
        return {
            ...validationRes,
            password: crypto.createHash('md5').update(validationRes.password).digest('hex')
        };
    } catch (err: any) {
        return formatErrorToMessage(err);
    }
}