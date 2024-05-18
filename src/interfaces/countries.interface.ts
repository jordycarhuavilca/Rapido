import mongoose from 'mongoose';

interface country {
  id?: mongoose.Types.ObjectId;
  name: string;
}

export default country;
