import { Message } from "../types/Message";
import { z } from "zod";

export const formatErrorToMessage = (err: any): Message => {
    const status = 400;
    let code = '';
    let msg = '';
    
    if (err instanceof z.ZodError) {
        const errorData = err.issues[0];
        code = errorData.code;
        msg = `${errorData.message}: "${errorData.path}"`;
    } else {
        let [ errorType, ...errorMessage ] = err.toString().split(' ');
        code = errorType.slice(0, errorType.length - 1);
        msg = errorMessage.join(' ');
    }
    
    return {
        status, 
        code, 
        msg
    };
};