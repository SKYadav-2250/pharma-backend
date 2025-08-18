

import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear";
import { addMedicine, updateMedicine } from "../controller/medicine.controller";


const router =Router();


router.route('/medicine').post(verifyToken,addMedicine);

router.route('/updateMedicine').post(verifyToken,updateMedicine);

router.route('delteMedicine').post(verifyToken,updateMedicine);



