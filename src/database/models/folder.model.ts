import mongoose from 'mongoose';
const { Schema } = mongoose;
import { typeObject } from '@utils/object'
interface folder {
  id: string;
  name: string;
  size: string;
  numFiles: number;
  numFolders: number;
  location: string;
  type: string;
  objects: any;
  userId: string;
}

const folderModel = new Schema<folder>(
  {
    id: String,
    name: String,
    size: {
      type: String,
      required: true
    },
    numFiles: {
      type: Number,
      default: 0
    },
    numFolders: {
      type: Number,
      default: 0
    },
    location: String,
    type: {
      type: String,
      enum: typeObject
    },
    objects: {
      type: [Schema.Types.Mixed],
      default: []
    },
    userId: {
      type: String,
      ref: 'users'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<folder>('folders', folderModel);
