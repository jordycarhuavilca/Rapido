import { Request, Response } from 'express';
import objectServ from '../services/object.service';
import { file } from '@interfaces/file/file.interface';
import { folder } from '@interfaces/folder/folder.interface';
import { validationResult } from 'express-validator';
const objectController = {
  // addObject: async (req: Request, res: Response) => {
  //   let listObject = [];
  //   const files: file[] = req.files || [];
  //   const folder = req.body as folder;
  //   const userId = req.params.userId;

  //   if (files.length == 0 && Object.keys(folder).length == 0)
  //     return res.status(422).json({
  //       error: true,
  //       message:
  //         'server cannot process the request because it doesnt contain any data'
  //     });

  //   if (files.length > 0) listObject = files;
  //   else {
  //     listObject = folder;
  //     if (Object.keys(listObject[0]).length != 7)
  //       return res.status(422).json({
  //         error: true,
  //         message: 'umcompleted fields'
  //       });
  //   }

  //   try {
  //     const data = await objectServ.addObject(listObject, userId);
  //     if (data.length > 0)
  //       res.status(201).json({
  //         message: 'created successfully',
  //         data: data
  //       });
  //     else
  //       res.status(500).json({
  //         error: true,
  //         message: 'It cannot process the expected action'
  //       });
  //   } catch (error) {
  //     const statusCode = error.statusCode || 500;
  //     res.status(statusCode).json({
  //       error: true,
  //       message: error.message
  //     });
  //   }
  // },
  addSubObjects: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const listFiles: file[] = [];
    const body: folder = req.body
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (Array.isArray(req.file) && req.file.length > 0) {
      listFiles.push(...(req.file as file[]));
    }
    console.log(listFiles)
    res.status(201).json({
      message: 'created successfully'
      // data: data || null
    });

    // let listObjs = [];
    // const obj = req.body;
    // const pathNames = obj.pathNames;

    // if (listFiles.length == 0) listObjs.push(obj);
    // else listObjs = [...listFiles];

    // const data = await objectServ.addSubObjects(pathNames, listObjs, userId);
  },
  getObject: async (req, res) => {}
};

export default objectController;
