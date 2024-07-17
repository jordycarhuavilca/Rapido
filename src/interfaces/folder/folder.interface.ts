import { file } from '@interfaces/file/file.interface';
import { v4 as uuidv4 } from 'uuid';
import { typeObject } from '@utils/object'; 
export interface addFolderDto {
  id: uuidv4;
  name: string;
  size: string;
  numFiles: number;
  location: string;
  type: typeObject;
  objects?: Array<folder | file >;
  userId: string;
  creationDate?: Date;
  updatedDate?: Date;
}