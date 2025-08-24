

import { Router } from "express";


import { addMedicine, createCompany, deleteComapany, UpdateCompany } from "../controller/company.controller.js";



const companyRouter=Router();




companyRouter.route('/create-company').post(createCompany);
companyRouter.route('/update-company/:id').put(UpdateCompany);
companyRouter.route('/delete-company/:id').delete(deleteComapany)
companyRouter.route('/add-medicine/:id').post(addMedicine)


export {companyRouter}