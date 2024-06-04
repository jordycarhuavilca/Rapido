import mongoose from 'mongoose';
import { gender } from '../../utils/user';
const { Schema } = mongoose;

interface user {
  name: string;
  email: string;
  password: string;
  lastname: string;
  gender: string;
  bornDay: Date;
  token: string;
  country: string;
}

const userModel = new Schema<user>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: gender,
      required: false
    },
    bornDay: {
      type: Date,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    country: {
      type: String,
      ref: 'countries',
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<user>('users', userModel);
