

import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
    path: './.env'
})





const userSchema=new mongoose.Schema({

    username:{

        type:String,
        required:true,
        unique:false,
        trim:true,
        lowercase:true

    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
         match: /.+\@.+\..+/
    },

    password:{
        type:String,
        required:true,
        unique:false,
        trim:true,
        minlength:6
    },
    refreshToken:{
        type:String
       }





},{
    timestamps:true
})


userSchema.methods.generateAccesstoken=function (){

    console.log("generating access token ")

    
 return jwt.sign({
  _id: this._id,
  username: this.username,
  email: this.email,
  
}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

}


userSchema.methods.generaterefreshtoken=function (){

    console.log("generating access token ")

    
 return jwt.sign({
  _id: this._id,
  username: this.username,
  email: this.email,
  
}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' });

}


export const User=mongoose.model("User",userSchema);