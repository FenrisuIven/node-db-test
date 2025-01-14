const errorMessages = require('../helpers/errorMessages.ts');
const credentials = require('../../configuration/dbCredentials.ts');

async function getUserFromDB(req, res) {
    const url = require('url');
    const requestQuery = url.parse(req.url, true).query;
    if (Object.keys(requestQuery).length === 0) {
        throw new Error(`Error: ${errorMessages.NULL_QUERY}`);
    }
    
    const { Client } = require('pg');
    const client = new Client(credentials.dbCredentials);
    
    const readRes = await client.connect()
        .then(async () => {
            return await client.query(`SELECT * FROM "${requestQuery.table}"`).catch(err => {});
        }).then((data) => {
            return data.rows;
        })
    res.status(200).json(JSON.stringify(readRes));
}

module.exports = {
    getUserFromDB
};
