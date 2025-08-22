
import express, { request } from 'express';
import {userRouter} from './routes/user.routes.js';
import {medicineRouter} from './routes/medicine.routes.js'

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

app.use("/pharma/api/user",userRouter );
app.use("/pharma/api/medi",medicineRouter);


export {app};



