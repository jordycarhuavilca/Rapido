import { fileHomologationDto } from "@interfaces/file/fileHomologation.dto";
import { AddFolderDto } from '@interfaces/folder/addFolderDto';
export interface IaddSubObjects {
  folder?: AddFolderDto;
  root: string;
  userId: string;
  files: fileHomologationDto[];
}