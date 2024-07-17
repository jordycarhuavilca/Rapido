import { typeObject } from '@utils/object';
export class Objecto {
  private id: string;
  private name: string;
  private size: string;
  private location: string;
  private type: typeObject;
  private userId: string;
  private creationDate?: Date;
  private updatedDate?: Date;
  constructor(
    name: string,
    size: string,
    location: string,
    type: typeObject,
    userId: string,
    id: string,
    creationDate?: Date,
    updatedDate?: Date
  ) {
    (this.name = name),
      (this.size = size || '0'),
      (this.location = location),
      (this.type = type);
    (this.userId = userId),
      (this.creationDate = creationDate || new Date()),
      (this.updatedDate = updatedDate || new Date()),
      (this.id = id);
  }
  incrementSize(size: number) {
    this.size += size;
  }
  get idValue(): string | null {
    return this.id || null;
  }
  get nameValue(): string {
    return this.name;
  }
  get sizeValue(): string {
    return this.size;
  }
  get locationValue(): string {
    return this.location;
  }
  get typeValue(): typeObject {
    return this.type;
  }
  get userIdValue(): string {
    return this.userId;
  }
  get creationDateValue(): Date {
    return this.creationDate || new Date();
  }
  get updateDateValue(): Date {
    return this.updatedDate || new Date();
  }
  set idValue(id: string) {
    this.id = id;
  }
  set nameValue(name: string) {
    this.name = name;
  }
  set sizeValue(size: string) {
    this.size = size;
  }
  set locationValue(location: string) {
    this.location = location;
  }
  set typeValue(type: typeObject) {
    this.type = type;
  }
  set userIdValue(userId: string) {
    this.userId = userId;
  }
  set creationDateValue(creationDate: Date) {
    this.creationDate = creationDate;
  }
  set updateDateValue(updatedDate: Date) {
    this.updatedDate = updatedDate;
  }
}
