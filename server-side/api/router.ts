import { getUserFromDB } from './user/getUser';
import { handleRequest } from "./requestHandler";

import * as express from 'express';
const router = express.Router();

router.get('/api/getUser', async (
    req, 
    res
) => {
    await handleRequest(req, res, getUserFromDB);
});

export default router;