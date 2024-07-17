import { Request, Response } from 'express';
import objectServ from '../services/object.service';
import { IaddSubObjects } from '@interfaces/object/addSubObjects.dto';
import { validationResult } from 'express-validator';
const objectController = {
  addSubObjects: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const body: IaddSubObjects = { ...req.body, files: req.files || [] };
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const data = await objectServ.addSubObjects(body);
    res.status(201).json({
      message: 'created successfully',
      data: data || null
    });
  },
  getObject: async (req, res) => {}
};

export default objectController;
