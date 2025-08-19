import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utilits/asynchandler.js";









const  addMedicine=asyncHandler(async (req,res)=>{


    const {name,price,quantity,description,expiryDate ,company, ingredients}=req.body;

           console.log("Body: " + JSON.stringify(req.body));
               [name, price, quantity, description, expiryDate, company, ingredients].some(field => console.log(field));
        



if (
  [name, price, quantity, description, expiryDate, company].some(
    (field) =>
      field === undefined ||
      field === null ||
      (typeof field === "string" && field.trim() === "")
  ) ||
  !Array.isArray(ingredients) ||
  ingredients.length === 0 ||
  ingredients.some((ing) => typeof ing !== "string" || ing.trim() === "")
) {
  throw new ApiError(400, "All fields are required");
}



           
 

        const mediExist=await Medicine.findOne({name})    

        
        
        if(mediExist){
            throw new ApiError(400,"Medicnine already exist");


        }

        


        const newMedicine= await Medicine.create({
            name:name,
            company:company,
            expiryDate:new Date(expiryDate),
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




 const updateMedicine = asyncHandler(async (req, res) => {
  
    const { id } = req.params;   // medicine id
    const updates = req.body;    // new data from frontend

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({
      message: "Medicine updated successfully",
      medicine: updatedMedicine,
    });
}
 );




 const medicinedelete=asyncHandler(// controllers/medicineController.js
 async (req, res) => {
 
    const { id } = req.params; // medicine id from URL

    // Find and delete
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
      deletedMedicine,
    });

}
);


export {addMedicine,updateMedicine,medicinedelete}