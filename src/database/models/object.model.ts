import mongoose from "mongoose";
const { Schema } = mongoose;
const objectsModel = new Schema(
   {
      data: Schema.Types.Mixed,
   },
   {
      timestamps : true,
      versionKey: false
   }
)

export default mongoose.model('objects',objectsModel)