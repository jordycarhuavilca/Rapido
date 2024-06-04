import { Request, Response } from 'express';
import userServ from '../services/user.service';

export default class UserController {
  static addUser(req: Request, res: Response) {
    // const user = req.body
    // const listPro = Object.keys(user).length
    // if ( listPro== 0 ||
    //     listPro < 5
    // )
    // return res.status(422).json({
    //     error  : true,
    //     message : "validation failed",
    //     data : {}
    // })
    // try {
    // const data = await userServ.addUser(user)
    // res.status(200).json({
    //     error  : false,
    //     message : "ok",
    //     data : data
    // })
    // } catch (error) {
    //     const statusCode = error.statusCode || 500
    //     res.status(statusCode).json({
    //         error  : true,
    //         message : error.message,
    //     })
    // }
  }
  static getUser(req: Request, res: Response) {
    //         const user = req.body
    //         if (Object.keys(user).length == 2)
    //         res.status(422).json({
    //             error  : true,
    //             message : "validation failed",
    //         })
    // // await userServ.getUserByEmail(user);
    //         const data = {}
    //         if (Object.keys(data).length == 0)
    //         res.status(404).json({
    //             error  : true,
    //             message : "not found",
    //         })
    //         else
    //         res.status(200).json({
    //             error  : false,
    //             message : "ok",
    //             data : data
    //         })
  }
}
