import userModel from '@models/user.model';
import encryption from '../helpers/encryption';
import { addUser } from '@interfaces/user/dto/addUser';
class UserServ {
  async addUser(user: addUser) {
    const res = await userModel.findOne({email: user.email});

    user.password = await encryption.hashPassword(user.password);
    await userModel.create(user);
  }
  async getUserById(id: string) {
    const data = await userModel.findById(id).exec();
    return data;
  }
}

export default new UserServ();
