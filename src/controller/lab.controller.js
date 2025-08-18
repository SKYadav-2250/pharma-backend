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






 export {labCreate};