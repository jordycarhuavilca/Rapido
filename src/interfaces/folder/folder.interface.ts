import { file } from '@interfaces/file/file.interface';
import { v4 as uuidv4 } from 'uuid';
import { typeObject } from '@utils/object'; 
import { Folder } from '@entities/Folder.entity';
export interface addFolderDto {
  id: uuidv4;
  name: string;
  size: string;
  numFiles: number;
  location: string;
  type: typeObject;
  objects?: Array<Folder | file >;
  userId: string;
  creationDate?: Date;
  updatedDate?: Date;
}