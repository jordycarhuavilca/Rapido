import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'node:stream';

class S3Service {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });
  }
  public uploadFile(path: string, fileStream: Readable): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`S3Service.uploadFile.init`, { path, fileStream });

      const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

      const resp = new Upload({
        client: this.s3Client,
        params: {
          Bucket: AWS_BUCKET_NAME,
          Key: path,
          Body: fileStream
        }
      });

      console.log('S3Service.uploadFile.response');
      resp.on('httpUploadProgress', (progress) => {
        console.log(progress);
      });
      const data = resp.done();
      resolve(data);
    });
  }
  // static uploadFile(path: string, body: Readable):Promise<any> {
  //   return new Promise((resolve,reject)=>{
  //     AWS.config.update({
  //       region: process.env.AWS_REGION || '',
  //       credentials: {
  //         accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  //       }
  //     });
  //     const uploadParams = {
  //       Bucket: process.env.AWS_BUCKET_NAME || '',
  //       Key: path,
  //       Body:""
  //     };
  //     const s3 = new AWS.S3();

  //     s3.upload(uploadParams, (err, data) => {
  //       if (err) {
  //         console.log('Error', err);
  //         reject(err)
  //       }
  //       if (data) {
  //         console.log('Upload Success', data.Location);
  //         resolve(data);
  //       }
  //     });
  //   });
  // }
  // uploadFile(path: string, file: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const fileStream = Readable.from(file.buffer);

  //     const params = {
  //       Bucket: process.env.AWS_BUCKET_NAME || '',
  //       Key: path,
  //       Body: fileStream
  //     };
  //     const response = this.s3Client.send(new PutObjectCommand(params));
  //     resolve(response);
  //   });
  // }
}
export default S3Service;
