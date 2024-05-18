let count = 0

class objectHelper{
    constructor(){

    }
    //crear un folder o agregar files en un directorio especifico
    insertObjectsToFolder (object,listPathNames,listNewObj,limit){
        let res = {}
        //busca que campo contiene los archivos del folder encontrado
        for (const key in object) {

            //entra si es el campo es donde se pueden agregar objectos
            if (Array.isArray(object[key])) {
    
                  const listObj = object[key]  
             
                  const pathName = listPathNames[count]
    
                  //agregar el nuevo Objecto si llego al directorio que se espera
                  if (count >= limit || listObj.length == 0) {

                    //guardar objectos en el directorio requerido   
                    listNewObj.forEach(obj => {
                      listObj.push(obj)
                    });
                    res = object
                  }
    
    
                  if (count < limit ) {
    
                      //analiza contenido del folder
                      for (let i = 0; i < listObj.length; i++) {
                        
                        let obj = listObj[i]
                        let objName= obj.name
                        let typeObj = obj.type
    
                        //si ese el folder que se busca. realiza el proceso de nuevo
                          if( typeObj == "folder"
                          && objName == pathName){
                            count++
                            this.insertObjectsToFolder(obj,listPathNames,listNewObj,limit) 
                        }
                      }
                  }
                  res = object
                  break
            }
          }
          return res
    }
}

export default new objectHelper