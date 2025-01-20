import { IncomingMessage } from "node:http";
import { Message } from "./Message";
import { Client } from "pg";
import { ParsedUrlQuery } from "node:querystring";

export type DBAction = (
    client: Client,
    req: IncomingMessage,
    query: ParsedUrlQuery
) => Promise<Message>;