





import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear";
import { labCreate, labDelete, updateLab } from "../controller/lab.controller";



const router=Router();



router.route('labCreate').post(verifyToken,labCreate)
router.route('labUpdate').post(verifyToken,updateLab)
router.route('labCreate').post(verifyToken,labDelete)




