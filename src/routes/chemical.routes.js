import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear.js";
import { addChemical, deleteChemical, updateChemical } from "../controller/chemical.controller.js"

const chemicalRouter =Router();


chemicalRouter.route('/medicine').post(addChemical);

chemicalRouter.route('/updateMedicine/:id').post(verifyToken,updateChemical);

chemicalRouter.route('/delteMedicine/:id').delete(verifyToken,deleteChemical);

export {chemicalRouter}
