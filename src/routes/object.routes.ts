import { Router} from "express";
import objectController from "../controllers/object.controller.js";
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, preservePath : true })

const router = Router()

router.post('/upload/:userId',upload.array('object',12),objectController.addObject)
router.post('/upload/:userId/subObject',upload.array('object',12),objectController.addSubObjects)
export default router