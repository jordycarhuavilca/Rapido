import { Router } from 'express';
import objectController from '../controllers/object.controller';
import multer from 'multer';
import { body } from 'express-validator';
import { typeObject } from '../utils/object';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, preservePath: true });
const router = Router();

// router.post(
//   '/upload/:userId',
//   [upload.array('object', 12), body()],
//   objectController.addObject
// );

router.post(
  '/upload/subObject',
  [
    upload.array('files', 12),
    body('folders').optional().isArray().withMessage('folder must be an Array'),
    body('userId', 'userId must not be empty').exists().notEmpty(),
    body('root').exists().notEmpty().withMessage('folderRoot must not be empty')
  ],
  objectController.addSubObjects
);
export default router;
