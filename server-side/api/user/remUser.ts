import { ParsedUrlQuery } from "node:querystring";
import { queryTable } from "../utils/queryTable";
import { DBAction } from "../types/DBAction";
import { Message } from "../types/Message";
import { Client } from "pg";

export const removeUserFromDB: DBAction = async (
    client: Client,
    urlQuery: ParsedUrlQuery
): Promise<Message> => {
    const providedUserData = {
        id: urlQuery.id ? Number(urlQuery.id) : null,
        username: urlQuery.username ? urlQuery.username as string : null,
        email: urlQuery.email ? urlQuery.email as string : null
    };
    
    let queryParameters: string = '';
    Object.keys(providedUserData).filter((
        key: string
    ) =>  providedUserData[key as keyof typeof providedUserData] != null
    ).forEach((
        key: string,
        idx: number,
        arr: string[]
    ) => {
        const keyAsKeyof = key as keyof typeof providedUserData;
        const value = providedUserData[keyAsKeyof];
        
        const isOfStringType = typeof value === 'string';
        let queryValueDefinition = isOfStringType ? `'${value}'` : `${value}`;
        
        switch (true) {
            case idx < arr.length && idx !== arr.length - 1:
                queryParameters += `${key} = ${queryValueDefinition} AND `;
                break;
            default:
                queryParameters += `${key} = ${queryValueDefinition}`;
                break;
        }
    })
    const queryText: string = 
        `DELETE FROM "user" WHERE ${queryParameters}`;
    
    const queryRes = await queryTable(client, queryText);
    
    if ('status' in queryRes) {
        return queryRes;
    } else {
        return {
            status: 200,
            msg: `Query was performed successfully. ${queryRes.rowCount} rows were modified.`
        }
    }
}