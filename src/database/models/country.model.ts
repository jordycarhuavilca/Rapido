import mongoose from 'mongoose';
const { Schema } = mongoose;

interface country{
  name: string
}

const countryModel = new Schema<country>(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export default mongoose.model('countries', countryModel);
