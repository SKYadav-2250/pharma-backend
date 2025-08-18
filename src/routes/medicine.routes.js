

import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear";
import { addMedicine } from "../controller/medicine.controller";


const router =Router();


router.route('/medicine').post(verifyToken,addMedicine);




