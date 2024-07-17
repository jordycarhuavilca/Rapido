import { fileHomologationDto } from "@interfaces/file/fileHomologation.dto";
import { addFolderDto } from "@interfaces/folder/addFolderDto";
export interface IaddSubObjects{
    folder?: addFolderDto,
    root: string,
    userId: string,
    files: fileHomologationDto[]
}