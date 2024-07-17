import { File } from '@entities/File.entity';
import { Objecto } from '@entities/Object.entity';
import { GeneratedId } from '@helper/generateId';
import { setUpFile } from '@utils/file';
import {
  putNumberToEachObject,
  removeItem,
  getObjectsByType,
  setUpFolder
} from '@utils/folder';
import { typeObject } from '@utils/object';

export class Folder extends Objecto {
  private numFiles: number;
  private objects: Array<Folder | File | []>;
  private static count = 0;
  private static folderLocation: string = 'nube';
  constructor(
    name: string,
    size: string,
    numFiles: number,
    location: string,
    type: typeObject,
    userId: string,
    objects: Array<Folder | File | []>,
    id: string,
    creationDate?: Date,
    updatedDate?: Date
  ) {
    super(name, size, location, type, userId, id, creationDate, updatedDate);
    (this.numFiles = numFiles), (this.objects = objects);
  }
  private addObjectToFolder({
    attributes = {
      folder: {
        name: null as string | null,
        location: null as string | null,
        id: null as string | null
      },
      file: null as File | null
    }
  } = {}) {
    const { file, folder } = attributes;
    if (file) {
      this.objects.push(file);
      return;
    }
    if (!folder.name) folder.name = 'Nueva carpeta';
    console.log(`ìd ${folder.id}`);
    const id = folder.id ? folder.id : GeneratedId.ObjectId();
    console.log(`ìd2 ${id}`);
    this.objects.push(
      new Folder(
        folder.name,
        '0',
        0,
        Folder.folderLocation,
        typeObject.FOLDER,
        this.userIdValue,
        [],
        id
      )
    );
  }
  private restart() {
    Folder.count = 0;
    Folder.folderLocation = '';
  }
  private increaseSize(value: Folder | File) {
    this.sizeValue = (
      Number(this.sizeValue) + Number(value.sizeValue)
    ).toString();
  }
  private increaseNumberFiles() {
    this.numFiles++;
  }
  private increaseCount() {
    Folder.count += 1;
  }
  public async process(value: Folder | File) {
    console.log(`process ${value}`);
    if (!value?.nameValue) {
      throw new Error("Object doesn't exist");
    }
    const dirs: string[] = removeItem(value.locationValue.split('/'), 0);
    const limit: number = dirs.length - 1;
    console.log(`dirs splited ${dirs}`);

    const pathNames = putNumberToEachObject(dirs, value.typeValue);
    const objName = pathNames[Folder.count].name;

    console.log(pathNames);

    Folder.folderLocation += `/${objName}`;
    //agregar el nuevo Objecto si llego al directorio que se espera
    if (Folder.count >= limit && value instanceof File) {
      const isRepeated = this.findRepeatedObjects(typeObject.FILE, objName);
      console.log('isRepeated ' + isRepeated);
      if (isRepeated) throw new Error(' folder or file name must be unique');

      this.increaseSize(value);
      const res = this.addObjectToFolder({
        attributes: {
          folder: { location: null, name: null, id: value.idValue },
          file: value
        }
      });
      this.restart();
      return res;
    }
    if (Folder.count >= limit && value instanceof Folder) {
      const isRepeated = this.findRepeatedObjects(typeObject.FOLDER, objName);
      console.log('isRepeated ' + isRepeated);
      if (isRepeated) throw new Error(' folder or file name must be unique');

      this.increaseNumberFiles();
      const res = this.addObjectToFolder({
        attributes: {
          folder: { location: '', name: objName, id: value.idValue },
          file: null
        }
      });
      this.restart();
      return res;
    }
    console.log(`count ${Folder.count}`);

    const isEmptyInsideFolder = this.objects.length === 0;
    if (isEmptyInsideFolder) {
      console.log('add the first time');
      this.increaseNumberFiles();
      this.addObjectToFolder({
        attributes: {
          folder: { location: '', name: objName, id: value.idValue },
          file: null
        }
      });
    }

    for (let i = 0; i < this.objects.length; i++) {
      const obj: any = { value: this.objects[i] as Folder | File };
      console.log(`obj ${JSON.stringify(obj)}`);
      if (obj.value?.type === typeObject.FILE) obj.value = setUpFile(obj.value);
      if (obj.value?.type === typeObject.FOLDER)
        obj.value = setUpFolder(obj.value);
      // miFolder
      // nube

      const { nameValue, typeValue } = obj.value;
      if (nameValue === objName && typeValue === typeObject.FOLDER) {
        console.log('getting in the folder' + JSON.stringify(value));
        this.increaseSize(value);
        this.increaseNumberFiles();
        this.increaseCount();
        obj.value.process(value);
      }

      const isRepeated = this.findRepeatedObjects(typeObject.FOLDER, objName);
      console.log('isRepeated ' + isRepeated);
      if (isRepeated) continue;
      this.addObjectToFolder({
        attributes: {
          folder: { location: '', name: objName, id: value.idValue },
          file: null
        }
      });
    }
  }
  private findRepeatedObjects(tipoObjeto: typeObject, objName: string) {
    console.log('obj name ' + objName);
    console.log('list objects ' + JSON.stringify(this.objects));
    const hashTable = getObjectsByType(this.objects, tipoObjeto);
    console.log('hashTable ' + JSON.stringify(hashTable));
    return hashTable[objName] ? true : false;
  }
  get objectsValue() {
    return this.objects;
  }
  get numFilesValue() {
    return this.numFiles;
  }
}
