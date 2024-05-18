import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fileInterface from '@interfaces/file.interface'

const s3Service = {
  send: async (file: any) => {
    const client = new S3Client({
      region: process.env.AWS_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });
    // let location = 'MyHB/'
    // if (splited.length > 2)location += splited.pop().reduce((a,b)=> a += `${b}/`,a)

    let fileName = `${file.id}-${file.name}`;
    const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

    let data = {
      data: {}
    };

    const param = {
      Bucket: AWS_BUCKET_NAME,
      Key: `HB/${fileName}`,
      Body: file.buffer
    };
    console.log('sending object to bucket ...');

    const command = new PutObjectCommand(param);
    try {
      await client.send(command);
      data.data = file;
      return data;
    } catch (error) {
      if (Object.keys(data).length == 0) return null;
      return data;
    }
  }
};
export default s3Service