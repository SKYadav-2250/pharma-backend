

import { Company } from "../models/company.model.js";
import { ApiError } from "../utilits/ApiError.js";
import { asyncHandler } from "../utilits/asynchandler.js";
import mongoose from "mongoose";




const createCompany=asyncHandler(async (req,res)=>{

console.log(` Data  ${JSON.stringify(req.body)}`);

const company =req.body;

console.log(   ` data company  ${company.name}`)

   if(!company.name||!company.address || !company.contactEmail ){

   throw  ApiError(401, "All field Are Required");

   }


 const companyExist = await Company.findOne({ name: company.name });


 console.log(`copmay   ${companyExist}`);

 if(companyExist){
  throw  ApiError(401,"company alredy exist");
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

const addMedicine=asyncHandler(async (req, res)=>{

  console.log(' add medicines me hai ')


const {id} =req.params;

  const {medicines}=req.body;

  console.log(` req . bosy ${medicines}   ${id}`)

  if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
    throw new ApiError(400, "Medicines array required");
  }


  const updatedCompany = await Company.findByIdAndUpdate(
  id,
  {
    $push: { medicines: { $each: medicines } }, // multiple medicines ek sath push
  },
  { new: true }
);


 if (!updatedCompany) {
          throw new ApiError(400, "Comapany Not Found ");

    }

     res.status(201).json({

    message:"MEdicine aaded successfully",
    medicines:medicines
  })


})


const deleteComapany=asyncHandler(async (req, res)=>{

 const {id}=req.params;


 const deleteComp=await Company.findOneAndDelete(id);



 if(!deleteComp){


   throw new ApiError(402, "Company not found");
 }


 res.status(201).json({

   message : "company deleted successfully",
   company:deleteComp
 })



})

export {createCompany,UpdateCompany,deleteComapany,addMedicine}

