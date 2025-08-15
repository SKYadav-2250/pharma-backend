

const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../utilits/asynchandler');
const { User } = require('../models/user.model');



const  verifyToken = asyncHandler (async (req, res, next) => {
    try {


   const token=req.cookies?.accesstoken ||
       req.header('Authorization').replace("Bearer"," ");


       if(!token){
        return res.status(401).json({error:"Please authenticate using a valid token"});
       }

       const decoded =await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


       const user=await User.findById(decoded?._id);

       if(!user){
        return res.status(401).json({error:"User not found"});
       }


      res.user= user
      console.log("✅ Token is valid:", decoded);
      next();
       

    } catch (err) {
        console.log("❌ Invalid token:", err.message);
        throw new Error(err.message, 401);
    }
})



export {verifyToken}
