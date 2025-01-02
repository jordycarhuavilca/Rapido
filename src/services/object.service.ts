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

class ObjectService {
  static async addSubObjects(data: IaddSubObjects) {
    try {
      console.log(`addSubObjects.init`, data);
      const { files = [], root = null, userId, folder } = data;
      const updatedFolder = { value: {} };

      const res = {
        value: (await this.getFolderRootByUserId(userId)) as Folder | null
      };

      console.log(`addSubObjects.getFolderRootByUserId`, res);

      if (!res.value?.idValue) {
        res.value = await this.createRootFolder(userId);
      }
      const folderRoot: Folder | null = res.value;

      if (files.length > 0 && folderRoot) {
        updatedFolder.value = await new Promise((resolve, reject) => {
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
            // const streamFile: Readable = Readable.from(file.buffer);
            // const s3Service = new S3Service();
            // const uploadResponse = await s3Service.uploadFile(
            //   `Hb1/${file.originalname}`,
            //   streamFile
            // );
            // console.log('uploadResponse ', uploadResponse);
          }
          console.log(`addSubObjects.addObject.response dddddd`, folderRoot);

          resolve(folderRoot);
        });
      }
      if (folder?.name && folderRoot) {
        const { location, name } = folder;
        const id = GeneratedId.ObjectId();
        folder.location = location ? `${root}/${location}` : `${root}/${name}`;

        updatedFolder.value = await new Promise((resolve, reject) => {
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

      const result = updatedFolder.value as Folder;
      console.log(`addSubObjects.addObject.response`, {
        folder: result,
        objects: result.objectsValue
      });
      console.log(
        `addSubObjects.addObject.isIntance`,
        result instanceof Promise
      );
      return result;
      // return await folderModel.findOneAndUpdate(
      //   { userId: userId },
      //   {
      //     $set: {
      //       objects: result.objectsValue,
      //       numFiles: result.numFilesValue,
      //       size: result.sizeValue
      //     }
      //   },
      //   { new: true }
      // );
      return null;
    } catch (error) {
      // throw new Error(' folder or file name must be unique');
    }
  }
  private static async createRootFolder(
    userId: string
  ): Promise<Folder | null> {
    const rootFolder = await folderModel.create({
      name: 'root',
      location: 'root/',
      numFiles: 0,
      size: 0,
      type: typeObject.FOLDER,
      objects: [],
      userId
    });

    const data = await this.getFolderRootByUserId(rootFolder.userId);
    if (!data) return null;
    return data;
  }

  private static async getFolderRootByUserId(
    id: string
  ): Promise<Folder | null> {
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

export default ObjectService;
