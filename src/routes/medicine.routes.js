

import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear.js";
import { addMedicine, updateMedicine } from "../controller/medicine.controller.js";


const medicineRouter =Router();


medicineRouter.route('/medicine').post(addMedicine);

medicineRouter.route('/updateMedicine').post(verifyToken,updateMedicine);

medicineRouter.route('delteMedicine').post(verifyToken,updateMedicine);



export {medicineRouter}