
import express from 'express';
import {router} from './routes/user.routes.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true

}

))

app.use(cookieParser());

app.use("/pharma/api",router );


export {app};



