
import express, { request } from 'express';
import {userRouter} from './routes/user.routes.js';
import {medicineRouter} from './routes/medicine.routes.js'
import { chemicalRouter } from './routes/chemical.routes.js';
import { ApiError } from './utilits/ApiError.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { companyRouter } from './routes/company.routes.js';



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
app.use("/pharma/api/chemical",chemicalRouter);
app.use("/pharma/api/company",companyRouter);


app.use((err, req, res, next) => {
 // for debugging in terminal

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      data: null,
    });
  }

  // Fallback for unexpected errors
  res.status(500).json({
    statusCode: 500,
    success: false,
    message: "Internal Server Error",
    data: null,
  });
});


export {app};



