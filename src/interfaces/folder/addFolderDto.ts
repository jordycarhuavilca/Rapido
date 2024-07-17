import { typeObject } from '@utils/object';
export interface addFolderDto {
  name: string;
  size: string;
  numFiles: number;
  location: string;
  type: typeObject;
}
