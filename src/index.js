import dotenv from "dotenv"

import connctDB from "./db/database.js";

import {app} from "./app.js";



const PORT = process.env.PORT||8000;

dotenv.config({
    path: './.env'
})


connctDB().then(()=>{

    app.on("error", (error)=>{
        console.error(error);
    });


app.listen(PORT||'0.0.0.0', () => {
  console.log(`server running at ${PORT}`)
})



}).catch((error)=>{
    console.log("mongoDB is connected to fail ! ! ", error);
});

