



import mongoose from "mongoose";
import {asyncHandler} from "../utilits/asynchandler.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";


const generateAccesstokenMethod=async(userId)=>{

      
try {
   
  
     const user=await User.findById(userId);
     
     const accesstoken=await user.generateAccesstoken();
     console.log(`aceestoken for user ${user.username}`); 
     const refreshToken= await user.generaterefreshtoken();
     user.refreshToken=refreshToken;
     await user.save({validateBeforeSave:false});

       return {accesstoken,refreshToken};


} catch (error) {

  throw new Error(error.message);
  
}


}


const resisterdUser=asyncHandler(  async(req, res)=>{


    console.log(` registered user controller called  ${req.body}`);

      const { username, email, password } = req.body;


            if(
            [ ,email,username,password].some((field)=>
                field?.trim()===""
            )
                ){
                    throw new ApiError(400,"All field are required")
                }
   

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword

        });
      await newUser.save();



      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });





})



const loginUser = asyncHandler(async(req, res) => {

 const {email, password} = req.body;




            if(
            [ email,password].some((field)=>
                field?.trim()===""
            )
                ){
                    throw new ApiError(400,"All field are required")
                }

          
        const user = await User.findOne({ email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }


         const {accesstoken,refreshToken}= await generateAccesstokenMethod(user._id);
     

         const loggedInUser = await User.findById(user._id).select("-password -refreshToken");


    

   const options={
      httpOnly:true,
      secure:true
   }


   return res.status(200).cookie("accessToken", accesstoken, options)
  .cookie("refreshToken", refreshToken, options).json({
    message:"Login successful",
    accesstoken:accesstoken,
    refreshToken:refreshToken,
    user: loggedInUser
  })






             });





export  {loginUser,
  resisterdUser}