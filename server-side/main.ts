const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const routes = require('./api/router.ts');

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(8080);