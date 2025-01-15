import { IncomingMessage } from "node:http";
import { IMessage } from "../interfaces/IMessage";
import { Client } from "pg";
import { ParsedUrlQuery } from "node:querystring";

export type DBAction = (
    client: Client,
    req: IncomingMessage,
    query: ParsedUrlQuery
) => Promise<IMessage>;