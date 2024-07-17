import userModel from '../database/models/user.model';
import encryption from '../helper/encryption';
import { addUserDto } from '@interfaces/user/dto/addUser';
import folderModel from '../database/models/folder.model';
import { typeObject } from '../utils/object';
class UserServ {
  async addUser(user: addUserDto) {
    const res = await userModel.findOne({ email: user.email });
    if(res) return
    user.password = await encryption.hashPassword(user.password);
    const promise = new Promise(async(resolve,reject)=>{
      const newUser = await userModel.create(user);
      const folder = await folderModel.create({
        name: 'nube',
        location: 'nube/',
        numFiles: 0,
        size: 0,
        type: typeObject.FOLDER,
        objects: [],
        userId: newUser._id
      });
      resolve({newUser,folder})
    })
    return promise
  }
  async getUserById(id: string) {
    const data = await userModel.findById(id).exec();
    return data;
  }
}

export default new UserServ();
