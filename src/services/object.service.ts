import folderModel from '@models/folder.model';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { IaddSubObjects } from '@interfaces/object/addSubObjects.dto';
import { Folder } from '@entities/Folder.entity';
import { typeObject } from '@utils/object';
import { File } from '@entities/File.entity';
import { GeneratedId } from '@helper/generateId';
import { Readable } from 'node:stream';
import S3Service from '@lib/s3Service';

class objectServ {
  private _addIdToFolder(obj, userId) {
    const data = {};
    obj.id = uuidv4();
    obj.userId = userId;

    // data.data = obj;
    return data;
  }
  // agrega todo tipo de objectos en un folder elegido
  async addSubObjects(data: IaddSubObjects) {
    console.log(`addSubObjects.init`, data);
    const { files = [], root = null, userId, folder } = data;
    const updatedFolder = { value: {} };
    //solo el folder tiene el campo type cuando viene del controller

    const res: Folder | null = await this.getFolderRootByUserId(userId);
    if (!res?.idValue)
      throw new Error('Not Found. Registrate into app firstly');
    const folderRoot: Folder = res;

    if (files.length > 0) {
      updatedFolder.value = new Promise(async (resolve, reject) => {
        for (const file of files) {
          const id = GeneratedId.uuid();
          const location = `${root}/${file.originalname}`;
          folderRoot.process(
            new File(
              file.originalname,
              file.size,
              location,
              '',
              path.extname(file.originalname),
              userId,
              typeObject.FILE,
              id
            )
          );
          const streamFile = Readable.from(file.buffer);
          const s3Service = new S3Service();
          const uploadResponse = await s3Service.uploadFile(
            `Hb1/${file.originalname}`,
            streamFile
          );
          // console.log('uploadResponse ', uploadResponse);
        }

        resolve(folderRoot);
      });
    }
    if (folder?.name) {
      updatedFolder.value = new Promise((resolve, reject) => {
        const { location, name } = folder;
        const id = GeneratedId.ObjectId();
        folder.location = location ? `${root}/${location}` : `${root}/${name}`;
        folderRoot.process(
          new Folder(
            folder.name,
            folder.size,
            folder.numFiles,
            folder.location,
            folder.type,
            userId,
            [],
            id
          )
        );
        resolve(folderRoot);
      });
    }

    const result = (await updatedFolder.value) as Folder;
    console.log(`addSubObjects.addObject.response`, result);

    return await folderModel.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          objects: result.objectsValue,
          numFiles: result.numFilesValue,
          size: result.sizeValue
        }
      },
      { new: true }
    );
  }
  // async _addObject(listObj, objectType, userId) {
  //   let res = {};
  //   return await Promise.all(
  //     listObj.map(async (obj) => {
  //       if (objectType == 'folder') {
  //         obj.location = 'myHB';
  //         const data = this._addIdToFolder(obj, userId);
  //         return await objectModel.create(data);
  //       }

  //       // await aws_s3.send(obj, userId).then(async (data) => {
  //       //   if (data) res = await objectModel.create(data)
  //       // });

  //       return res;
  //     })
  //   ).catch(() => {
  //     return [];
  //   });
  // }

  // // proceso de crear un folder y objetos en el inicio
  // async addObject(listObj, userId) {
  //   //cuando los objectos son de tipo file no contienen el campo type
  //   const objectType = listObj[0].type ? 'folder' : 'file';
  //   const objects = await this.getObjects(userId);

  //   if (!objects) return await this._addObject(listObj, objectType, userId);

  //   let hashFileName = {};

  //   for (const obj of listObj) {
  //     if (objectType == 'file') {
  //       let splited = obj.originalname.split('/');
  //       let name = splited[splited.length - 1];
  //       hashFileName[name] = name;
  //     } else hashFileName[obj.name] = obj.name;
  //   }

  //   const oneTypeObjects = objects.filter((obj) => obj.data.type == objectType);

  //   if (oneTypeObjects.length == 0)
  //     return await this._addObject(listObj, objectType, userId);

  //   let objRepeated =
  //     oneTypeObjects.filter(
  //       (obj) => hashFileName[obj.data.name] == obj.data.name
  //     ) || [];

  //   if (objRepeated.length > 0)
  //     throw new ValidateError(
  //       `ONE TYPE OBJECT'S NAME MUST BE UNIQUE IN THE SAME DIRECTORY`,
  //       422
  //     );
  //   else return await this._addObject(listObj, objectType, userId);
  // }

  async getFolderRootByUserId(id: string): Promise<Folder | null> {
    const data = (await folderModel.findOne({ userId: id }).exec()) as any;

    // console.log(`res ${data}`);
    if (!data) return null;
    const {
      _id,
      name,
      size,
      numFiles,
      location,
      type,
      userId,
      objects,
      createdAt,
      updatedAt
    } = data;

    const folder = new Folder(
      name,
      size,
      numFiles,
      location,
      type,
      userId,
      objects,
      _id || '',
      createdAt,
      updatedAt
    );
    return folder;
  }
}

export default new objectServ();

// const obb = new objectServ()
// const updatedFolder =await obb.addSubFolder('934931/9349344/934935/934938',{message : 'you really did it'})

// console.log(JSON.stringify(updatedFolder))
