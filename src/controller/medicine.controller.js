import { Medicine } from "../models/medicine.model";
import { asyncHandler } from "../utilits/asynchandler";









const  addMedicine=asyncHandler(async (req,res)=>{


    const {name,price,quantity,description,expiry ,company, ingredients}=req.body;


         if(
            [ name,price,quantity,description,expiry,company,ingredients].some((field)=>
                field?.trim()===""
            )
                ){
                    throw new ApiError(400,"All field are required")
                }



        const mediExist=await Medicine.findOne({name})    
        
        if(mediExist){
            throw new ApiError(400,"Medicnine already exist");


        }



        const newMedicine=Medicine.create({
            name:name,
            company:company,
            expiryDAte:expiry,
            price:price,
            quantity:quantity,
            description:description,
            ingredients:ingredients

        })

        await newMedicine.save();

          res.status(201).json({
        message: "NEw Medicine Added successfully",
        medicine: {
          id: newMedicine._id,
          name: newMedicine.name,
          quantity:  newMedicine.quantity,
          price: newMedicine.price
        }
      });



})


export {addMedicine}