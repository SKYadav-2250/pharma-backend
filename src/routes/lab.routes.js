





import { Router } from "express";
import { verifyToken } from "../middlewear/auth.middlewear";
import { labCreate } from "../controller/lab.controller";



const router=Router();



router.route('labCreate').post(verifyToken,labCreate)


