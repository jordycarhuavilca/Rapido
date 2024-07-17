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
  
  async addSubObjects(data: IaddSubObjects) {
    console.log(`addSubObjects.init`, data);
    const { files = [], root = null, userId, folder } = data;
    const updatedFolder = { value: {} };

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
