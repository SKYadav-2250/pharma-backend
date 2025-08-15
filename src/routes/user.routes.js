

import { Router } from 'express';
import { resisterdUser,loginUser, logout, updatepass} from '../controller/user.controler.js';
import { verifyToken } from '../middlewear/auth.middlewear.js';


const router = Router();

router.post('/register', resisterdUser);
router.route('/login').post(loginUser);

router.route("/logout").post(verifyToken,logout)
router.route("/updatepass").post(updatepass)









export  {router};



