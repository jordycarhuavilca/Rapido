import { Objecto } from '@entities/Object.entity';
import { typeObject } from '@utils/object';
export class File extends Objecto {
  url: string;
  ext: string;
  constructor(
    name: string,
    size: string,
    location: string,
    url: string,
    ext: string,
    userId: string,
    type: typeObject,
    id: string,
    creationDate?: Date,
    updatedDate?: Date
  ) {
    super(name, size, location, type, userId, id, creationDate, updatedDate);
    (this.url = url), (this.ext = ext);
  }
  get urlValue(): string {
    return this.url;
  }
  get extValue(): string {
    return this.ext;
  }
  set urlValue(url: string) {
    this.url = url;
  }
  set extValue(ext: string) {
    this.ext = ext;
  }
}
