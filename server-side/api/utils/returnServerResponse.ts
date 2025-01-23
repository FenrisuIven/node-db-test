import { Message } from "../types/Message";
import { ServerResponse } from "node:http";

export const returnServerResponse = ((data: Message | any, res: ServerResponse) => {
    let returnData: string;
    if(data.status >= 400) {
        returnData = JSON.stringify(`${data.status}: ${data.msg} [${data.code}]`);
    } else if ('json' in data) {
        returnData = typeof data.json === 'string' ? data.json : JSON.stringify(data.json);
    } else {
        returnData = JSON.stringify(data.msg);
    }
    res.statusCode = data.status;
    res.end(returnData);
});