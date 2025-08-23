

import { Company } from "../models/company.model.js";
import { ApiError } from "../utilits/ApiError.js";
import { asyncHandler } from "../utilits/asynchandler.js";
import mongoose from "mongoose";



const createCompany=asyncHandler(async (req,res)=>{

console.log(` Data  ${JSON.stringify(req.body)}`);

const company =req.body;

console.log(   ` data company  ${company.name}`)

   if(!company.name||!company.address || !company.contactEmail ){

   throw new ApiError(401, "All field Are Required");

   }


 const companyExist = await Company.findOne({ name: company.name });


 console.log(`copmay   ${companyExist}`);

 if(companyExist){
  throw new ApiError(401,"company alredy exist");
 }



 const companycreate=await Company.create({
  name: company.name,
  address :company.address,
  contactEmail:company.contactEmail,
medicines :company.medicines


 })

await companycreate.save();

  res.status(201).json({
    message: "New Comapany added successfully",
    company: companycreate,
  });



})



const UpdateCompany=asyncHandler (async (req,res)=>{

const {id}=req.params;

const upadate=req.body;
console.log(`chceking logs  ${id}`);


const upadatecompany= await Company.findByIdAndUpdate(
   id,
   {
      $set:upadate
   },{
      new:true, runValidators:true
   },
);

console.log(`chceking logs 5`);

if(!upadatecompany){
  
   throw new ApiError(404,"failed to upadte teh medicine")
}



  res.status(201).json({
    message: "Comapny Updated successfully",
    upadate: upadatecompany,
  });


})

export {createCompany,UpdateCompany}