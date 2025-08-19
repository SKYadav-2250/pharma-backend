

import jwt from "jsonwebtoken";


import { asyncHandler } from '../utilits/asynchandler.js';
import {User} from '../models/user.model.js';
// import { Medicine } from "../models/medicine.model.js";


const  verifyToken = asyncHandler (async (req, _, next) => {
    try {

        


   const token=req.cookies?.accesstoken ||
       req.header("Authorization")?.replace("Bearer ", "")

    //    console.log(` verofy token  ${req.body}`);


    

       if(!token){
        return res.status(401).json({error:"Please authenticate using a valid token"});
       }

    
       const decodeToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

       console.log(`decode token  ${decodeToken}`);


   
     
       const user=await User.findById(decodeToken?._id);

       if(!user){
        return res.status(401).json({error:"User not found"});
       }


      req.user= user
      console.log("✅ Token is valid:", decodeToken);
      next();
       

    } catch (err) {
        console.log("❌ Invalid token:", err.message);
        throw new Error(err.message, 401);
    }
})



export {verifyToken}
