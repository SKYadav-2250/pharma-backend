

import { Router } from 'express';
import { resisterdUser,loginUser, logout, updatepass} from '../controller/user.controler.js';
import { verifyToken } from '../middlewear/auth.middlewear.js';


const userRouter = Router();

userRouter.post('/register', resisterdUser);
userRouter.route('/login').post(loginUser);

userRouter.route("/logout").post(verifyToken,logout)
userRouter.route("/updatepass").post(updatepass)









export  {userRouter};



