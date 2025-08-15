

import mongoose from "mongoose";



const connctDB= async ()=>{


    try{


        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`);
        
       console.log(`\n Mongodb connection |! Db host ${connectionInstance.connection.host}`);


    }
    catch (error){
        console.log("failed to connect to database");
        console.log(error)
    }
}


export default connctDB;