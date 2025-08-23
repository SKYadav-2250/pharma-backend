












import { Router } from "express";


import { createCompany, deleteComapany, UpdateCompany } from "../controller/company.controller.js";



const companyRouter=Router();




companyRouter.route('/create-company').post(createCompany);
companyRouter.route('/update-company/:id').put(UpdateCompany);
companyRouter.route('/delete-company/:id').delete(deleteComapany)


export {companyRouter}