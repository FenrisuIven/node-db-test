import { Message } from "../types/Message";

export const formatErrorToMessage = (err: Error): Message => {
    let [ errorType, ...errorMessage ] = err.toString().split(' ');
    errorType = errorType.slice(0, errorType.length - 1);
    return {
        status: 400,
        code: errorType,
        msg: errorMessage.join(' ')
    };  
};