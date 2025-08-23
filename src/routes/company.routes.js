












import { Router } from "express";


import { createCompany, UpdateCompany } from "../controller/company.controller.js";



const companyRouter=Router();




companyRouter.route('/create-company').post(createCompany);
companyRouter.route('/update-company/:id').put(UpdateCompany);


export {companyRouter}