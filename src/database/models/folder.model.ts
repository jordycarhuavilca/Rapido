import mongoose from 'mongoose';
const { Schema } = mongoose;
import { v4 as uuidv4 } from 'uuid';
import { typeObject } from '@utils/object'
interface folder {
  id: uuidv4;
  name: string;
  size: string;
  numFiles: number;
  location: string;
  type: string;
  objects?: any;
  userId: string;
}

const folderModel = new Schema<folder>(
  {
    name: String,
    size: {
      type: String,
      required: true
    },
    numFiles: {
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
    timestamps: true
  }
);

export default mongoose.model<folder>('folders', folderModel);
