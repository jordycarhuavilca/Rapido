import userModel from '../database/models/user.model';
import encryption from '../helper/encryption';
import { addUserDto } from '@interfaces/user/dto/addUser';
import folderModel from '../database/models/folder.model';
import { typeObject } from '../utils/object';
class UserServ {
  async addUser(user: addUserDto) {
    const res = await userModel.findOne({ email: user.email });
    if (res) return;
    user.password = await encryption.hashPassword(user.password);
    const newUser = await userModel.create(user);
    return newUser;
  }
  async getUserById(id: string) {
    const data = await userModel.findById(id).exec();
    return data;
  }
}

export default new UserServ();
