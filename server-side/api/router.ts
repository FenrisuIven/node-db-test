import * as express from 'express';
const router = express.Router();

import { getUserFromDB } from './user/getUser';

router.get('/api/getUser', getUserFromDB);

export default router;