
const folder = {
  originalname : "",
  size : 0,
  numFiles : 0,
  type : "folder",
  objects : [],
  userId : ""
}
const paths = [
  {
    fieldname: 'object',
    originalname: 'test-files/manga.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    type  : 'file',
    size: 2291051
  },
     
  {
    fieldname: 'object',
    originalname: 'test-files/hola/wp2301621-anime-4k-wallpapers.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    type  : 'file',
    size: 1192800
  },
  {
    fieldname: 'object',
    originalname: 'test-files2/hola/wp5680261-sleeping-anime-hd-wallpapersd.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1192800,
    type  : 'file',
  },
  {
    fieldname: 'object',
    originalname: 'test-files3/hola/wp5680261-sleeping-anime-hd-wallpapersdk.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
      type  : 'file',
    size: 1192800
  },
  {
    fieldname: 'object',
    originalname: 'test-files3/hola/wp5680261-sleeping-anime-hd-wallpapersd233.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
        type  : 'file',
    size: 1192800
  },
  {
    fieldname: 'object',
    originalname: 'test-files3/hola1/wp5680261-sleeping-anime-hd-wallpapersd233.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    type  : 'file',
    size: 1192800
  },
  {
    fieldname: 'object',
    originalname: 'test-files3/hola2/wp5680261-sleeping-anime-hd- wallpapersd2334.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    type  : 'file',
    size: 1192800
  },
  {
    fieldname: 'object',
    originalname: 'test-files3/hola2/holaa/wp5680261-sleeping-anime-hd- wallpapersd2334.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    type  : 'file',
    size: 1192800
  },
  ]
let count = 0

class Tree{
constructor(folder = {}){

  if(Object.keys(folder).length > 0)
  this.originalname = folder.originalname || null
  this.size += folder.size || 0,
  this.numFiles = 0,
  this.type = "folder",
  this.objects = [],
  this.userId = ""
  
}
getObjectsByType(type){
  let hashTable = {}
  this.objects.forEach((obj)=>{
    if(obj.type == type)
     hashTable[obj.originalname] = obj.originalname 
  })
  return hashTable
}
  
async add(value,limit){
    let dirs = value.originalname.split('/')
    let lastDirLength = dirs.length-1
    dirs = dirs.map((objName,index)=>{
      if(index == lastDirLength)
         return {
          name : objName,
          type : "file"
         }
      
      else return {name : objName,type : "folder"}
       
    })
    let objName = dirs[count].name
    let hashTable = {}
    
    //agregar el nuevo Objecto si llego al directorio que se espera
    if(count >= limit) return this.objects.push(value)
    
    //solo si el valor a guardar es dentro de un folder y no hay ningun objeto dentro aun
  if(dirs.length > 1 && this.objects.length == 0) {
      folder.originalname = objName
      this.objects.push(new Tree({ ...folder })); // Crear una nueva instancia de folder
    } 
  
    for (let i = 0; i < this.objects.length ; i++ ) {
      let obj = this.objects[i]
        
      hashTable = this.getObjectsByType("folder")
        if(obj.originalname == objName  && dirs[count].type == "folder"){
          // console.log('getting in the folder')
          count++
          obj.add(value,limit)
        }
        if(!hashTable[objName]){
          folder.originalname = objName
          this.objects.push(new Tree({...folder })); // Crear una nueva instancia de folder
        }
    }
   
}
}




let tree = new Tree()

paths.map((obj)=>{
  count = 0
  let dirs = obj.originalname.split('/')
  let limit =(dirs.length-1)
  tree.add(obj,limit)
})

console.log(tree)