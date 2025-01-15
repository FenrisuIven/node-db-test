import { IMessage } from "../interfaces/IMessage";
import { Client } from "pg";

export async function queryTable(
    client: Client,
    queryText: string
) {
    return await client.query(queryText)
        .catch(err => {
            const errorMessage: IMessage = {
                status: 404,
                code: err.code,
                msg: err.toString().slice(7)
            };
            return errorMessage;
        });
}