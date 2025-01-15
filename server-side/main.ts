import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import router from './api/router';

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(8080);