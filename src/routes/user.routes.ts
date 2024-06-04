import { Router } from 'express';
import UserController from '../controllers/user.controller';
const router = Router();

router.post('/addUser', UserController.addUser);
router.get('/getUser', UserController.getUser);

export default router;
