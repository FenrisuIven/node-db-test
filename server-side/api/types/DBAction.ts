import { IncomingMessage } from "node:http";
import { IMessage } from "../interfaces/IMessage";
import { Client } from "pg";

export type DBAction = (
    client: Client,
    req: IncomingMessage
) => Promise<IMessage>;