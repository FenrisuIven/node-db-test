import { errorMessages } from '../helpers/errorMessages';
import { dbCredentials } from '../../setup/dbCredentials';
import { setupConnection } from "../../setup/dbSetub";
import pg from "pg";
import url from 'url';
import {read} from "node:fs";

async function getUserFromDB(req, res) {
    const requestQuery = url.parse(req.url, true).query;
    if (Object.keys(requestQuery).length === 0) {
        throw new Error(`Error: ${errorMessages.NULL_QUERY}`);
    }
    
    const client = await setupConnection(dbCredentials);
    if (Number(client.status)){
        res.status(client.status).json(JSON.stringify({
            code: client.code,
            msg: `${client.statuc}: There was an error connecting to the DataBase`
        }));
        res.end();
        return;
    }
    
    const readRes = await client.query(`SELECT * FROM "${requestQuery.table}"`)
        .catch(err => {
            console.log(err)
            return {
                status: 404,
                code: err.code,
                msg: err.toString().slice(7)
            }
        })
    if (readRes.status) {
        res.status(readRes.status).json(JSON.stringify({
            msg: `${readRes.status}: No object matched the target query${readRes.msg ? 
            ` (PG Error: ${readRes.msg.replace(/\\/g, '')})` : '' }`
        }));
        res.end();
        return;
    }
    
    res.status(200).json(JSON.stringify(readRes.rows));
    res.end();
    return;
}

export {
    getUserFromDB
}
