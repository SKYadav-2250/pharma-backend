

import { Router } from 'express';
import { resisterdUser,loginUser} from '../controller/user.controler.js';


const router = Router();

router.post('/register', resisterdUser);
router.route('/login').post(loginUser);






export  {router};



