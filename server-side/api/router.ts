const express = require('express');
const router = express.Router();

const { getUserFromDB } = require('./user/getUser.ts');

router.get('/api/getUser', getUserFromDB);

module.exports = router;