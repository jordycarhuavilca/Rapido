import mongoose from 'mongoose';
import country from '@interfaces/countries.interface'
const { Schema } = mongoose;


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
