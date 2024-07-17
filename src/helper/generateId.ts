import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export class GeneratedId {
  static uuid(): string {
    return uuidv4(); 
  }
  static ObjectId(): string {
    return new mongoose.Types.ObjectId().toString();
  }
}
// export default new GeneratedId();
