import { getUserFromDB } from './user/getUser';
import { handleRequest } from "./requestHandler";

import * as express from 'express';
import {addUserToDB} from "./user/addUser";
const router = express.Router();

router.get('/api/getUser', async (
    req, 
    res
) => {
    await handleRequest(req, res, getUserFromDB);
});
router.get('/api/addUser', async (
    req,
    res
) => {
    await handleRequest(req, res, addUserToDB);
});

export default router;