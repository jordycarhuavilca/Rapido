import objectModel from '../database/models/object.model.js';
import objectRepository from '../repos/object.repos.js';
import handleAysncErr from '../helpers/handleAsyncError.js';
import objectHelper from '../helpers/object.helper.js';
import aws_s3 from '../lib/aws_s3.js';
import { v4 as uuidv4 } from 'uuid';
import { ValidateError } from '../helpers/errorHandler.js';
import path from 'path';

const objectRepos = new objectRepository(objectModel);

class objectServ {
  _addIdToFolder(obj, userId) {
    const data = {};
    obj.id = uuidv4();
    obj.userId = userId;
    data.data = obj;
    return data;
  }
  async _addObject(listObj, objectType, userId) {
    let res = {};
    return await Promise.all(
      listObj.map(async (obj) => {
        if (objectType == 'folder') {
          obj.location = 'myHB';
          const data = this._addIdToFolder(obj, userId);
          return await handleAysncErr.run(objectRepos.addObject(data));
        }

        await aws_s3.send(obj, userId).then(async (data) => {
          if (data) res = await handleAysncErr.run(objectRepos.addObject(data));
        });

        return res;
      })
    ).catch(() => {
      return [];
    });
  }

  // proceso de crear un folder y objetos en el inicio
  async addObject(listObj, userId) {
    //cuando los objectos son de tipo file no contienen el campo type
    const objectType = listObj[0].type ? 'folder' : 'file';
    const objects = await this.getObjects(userId);

    if (objects.length == 0)
      return await this._addObject(listObj, objectType, userId);

    let hashFileName = {};

    for (const obj of listObj) {
      if (objectType == 'file') {
        let splited = obj.originalname.split('/');
        let name = splited[splited.length - 1];
        hashFileName[name] = name;
      } else hashFileName[obj.name] = obj.name;
    }

    const oneTypeObjects = objects.filter((obj) => obj.data.type == objectType);

    if (oneTypeObjects.length == 0)
      return await this._addObject(listObj, objectType, userId);

    let objRepeated =
      oneTypeObjects.filter(
        (obj) => hashFileName[obj.data.name] == obj.data.name
      ) || [];

    if (objRepeated.length > 0)
      throw new ValidateError(
        `ONE TYPE OBJECT'S NAME MUST BE UNIQUE IN THE SAME DIRECTORY`,
        422
      );
    else return await this._addObject(listObj, objectType, userId);
  }

  // agrega todo tipo de objectos en un folder elegido
  async addSubObjects(pathNames, listObj, userId) {
    const listPathNames = pathNames.split('/');
    const objectType = listObj[0].type ? 'folder' : 'file';

    //solo el folder tiene el campo type cuando viene del controller

    const objects = await this.getObjects(userId);
    const folderFound = objects.find(
      (obj) => obj.data.name == listPathNames[0] && obj.data.type === 'folder'
    ).data;

    let limit = listPathNames.length;

    if (objectType == 'folder' && folderFound) {
      const updatedFolder = objectHelper.insertObjectsToFolder(
        folderFound,
        listPathNames,
        listObj,
        limit
      );
      console.log(JSON.stringify(updatedFolder));
      // return await objectRepos.updateFolder(updatedFolder)
      return [];
    }

    const listObjAdded = await handleAysncErr.run(
      await Promise.all(
        listObj.map(async (file) => {
          let name = listPathNames[listPathNames.length - 1];
          let id = uuidv4();
          let fileName = `${id}-${name}`;

          file.id = id;
          file.name = name;
          file.url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/HB/${fileName}`;
          file.location = pathNames;
          file.type = 'file';
          file.ext = path.extname(file.originalname);
          file.userId = userId;

          const data = await aws_s3.send(file);
          if (data) {
            return data;
          }
        })
      )
    );
    const updatedFolder = objectHelper.insertObjectsToFolder(
      folderFound,
      listPathNames,
      listObjAdded,
      limit
    );

    return await objectRepos.updateFolder(updatedFolder);
  }

  async getObjects(userId) {
    const data = await handleAysncErr.run(
      objectRepos.getObjects({ 'data.userId': userId })
    );
    return data;
  }
}

export default new objectServ();

// const obb = new objectServ()
// const updatedFolder =await obb.addSubFolder('934931/9349344/934935/934938',{message : 'you really did it'})

// console.log(JSON.stringify(updatedFolder))
