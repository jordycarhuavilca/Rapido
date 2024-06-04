import { file } from '@interfaces/file/file.interface';
import { v4 as uuidv4 } from 'uuid';

export interface folder {
  id: uuidv4;
  name: string;
  size: string;
  numFiles: number;
  location: string;
  type: string;
  objects?: Array<folder | file >;
  userId: string;
  creationDate?: Date;
  updatedDate?: Date;
}