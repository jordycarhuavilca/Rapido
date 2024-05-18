import { v4 as uuidv4 } from 'uuid';

interface file {
  id?: uuidv4;
  name: string;
  size: string;
  creationDate?: Date;
  updatedDate?: Date;
  url: string;
  location: string;
  type: string;
  ext: string;
  userId: string;
}
export default file;
