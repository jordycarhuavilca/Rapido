import { gender } from '@utils/user';
export interface addUserDto {
  name: string;
  email: string;
  password: string;
  lastname: string;
  gender: gender
}
