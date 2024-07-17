import { File } from "@entities/File.entity";

export function setUpFile(prop: any): File{
  return new File(
    prop.name,
    prop.size,
    prop.location,
    prop.url,
    prop.ext,
    prop.userId,
    prop.type,
    prop.id,
    prop.creationDate,
    prop.updatedDate
  );
}
