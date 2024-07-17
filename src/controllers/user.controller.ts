import { Request, Response } from 'express';
import userServ from '../services/user.service';
import { gender } from '../utils/user';

export default class UserController {
  static async addUser(req: Request, res: Response) {
    const user = req.body
    try {
      console.log(JSON
        .stringify(user)
      )
    if(user.gender === gender.MALE){
      user.gender= gender.MALE
    }else{
      user.gender= gender.FEMALE
    }
    const data = await userServ.addUser(user)
    res.status(200).json({
        error  : false,
        message : "ok",
        data : data
    })
    } catch (error) {
        const statusCode = error.statusCode || 500
        console.log(error)
        res.status(statusCode).json({
            error  : true,
            message : error.message,
        })
    }
  }
  static getUser(req: Request, res: Response) {
  }
}
