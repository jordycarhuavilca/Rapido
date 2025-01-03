import { typeObject } from '@utils/object';
export interface AddFolderDto {
  name: string;
  size: string;
  numFiles: number;
  numFolders: number;
  location: string;
  type: typeObject;
}
