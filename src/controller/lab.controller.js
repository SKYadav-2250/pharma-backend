import { Lab } from "../models/lab.model";
import { asyncHandler } from "../utilits/asynchandler";








const labCreate=asyncHandler(async (req, res)=>{



      const {labName,department,labIncharge,roomNumber,chemicals}=req.body;



      if([labName,department,labIncharge,roomNumber,chemicals].some((field)=>field?.trim()==="")){
         throw new ApiError(400,"All field are required")
        
      }


      const labExist=await Lab.findOne({labName});


      if(labExist)
      {
         throw new ApiError(400,"Lab alredy exist")

      }



      const newLab=await Lab.create({
        labName:labName,
        department:department,
        labIncharge:labIncharge,
        roomNumber:roomNumber,
        chemicals:chemicals

      })
      await newLab.save()



         res.status(201).json({
        message: "NEw LAb Added successfully",
        lab: {
          id: newLab._id,
          labName: newLab.labName,
          department:newLab.department,
          labIncharge:  newLab.labIncharge,
          roomNumber: newLab.roomNumber,
        }
      });








})




 const updateLab = asyncHandler(async (req, res) => {
  
    const { id } = req.params;   // medicine id
    const updates = req.body;    // new data from frontend

    const updatedlab = await Medicine.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedlab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.status(200).json({
      message: "Medicine updated successfully",
      medicine: updatedlab,
    });
}
 );




 const labDelete=asyncHandler(// controllers/medicineController.js
 async (req, res) => {
 
    const { id } = req.params; // medicine id from URL

    // Find and delete
    const deletedLab = await Medicine.findByIdAndDelete(id);

    if (!deletedLab) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
      deletedLab,
    });

}
);




 export {labCreate,labDelete,updateLab}