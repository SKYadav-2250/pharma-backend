

import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear.js";
import { addMedicine, updateMedicine,medicinedelete } from "../controller/medicine.controller.js";


const medicineRouter =Router();


medicineRouter.route('/medicine').post(addMedicine);

medicineRouter.route('/updateMedicine/:id').post(verifyToken,updateMedicine);

medicineRouter.route('/delteMedicine/:id').delete(verifyToken,medicinedelete);




export {medicineRouter}