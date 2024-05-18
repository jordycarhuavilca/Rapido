import { Router} from "express";
import user from "../controllers/user.controller.js";
const router = Router()

router.post('/addUser',user.addUser)

export default router