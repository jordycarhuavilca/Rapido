import { Folder } from '@entities/Folder.entity';
import { File } from '@entities/File.entity';
import { typeObject } from './object';

export interface pathName {
  name: string;
  type: typeObject;
}
export function removeItem(array: string[], index: number): string[] {
  if (array.length === 0) return [];
  array.splice(index, 1);
  return array;
}

export function getLastIndex(dirs: string[]): number {
  if (dirs.length === 0) return -1;
  return dirs.length - 1;
}

export function putNumberToEachObject(
  dirs: string[],
  type: typeObject
): pathName[] {
  const lastIndex = getLastIndex(dirs);
  return dirs.map((objName, index) => {
    if (index === lastIndex && type === typeObject.FILE)
      return {
        name: objName,
        type: typeObject.FILE
      };
    else return { name: objName, type: typeObject.FOLDER };
  });
}
export function getObjectsByType(
  objects: Array<Folder | File | []>,
  tipoObjeto: typeObject
) {
  const hashTable = {};
  objects.forEach((obj: any) => {
    if (obj.type == tipoObjeto) hashTable[obj.name] = obj.name;
  });
  return hashTable;
}

export function setUpFolder(prop: any): Folder {
  return new Folder(
    prop.name,
    prop.size,
    prop.numFiles,
    prop.location,
    prop.type,
    prop.userId,
    prop.objects,
    prop.id,
    prop.creationDate,
    prop.updatedDate
  );
}
