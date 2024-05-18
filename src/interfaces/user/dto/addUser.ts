import { gender } from '@utils/user';
export interface addUser {
  name: string;
  email: string;
  password: string;
  lastname: string;
  gender: gender;
}
