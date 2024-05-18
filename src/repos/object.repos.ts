
class objectRepos{
    constructor(object : any){
        this.object = object
    }
    async addObject(object){
       return await this.object.create(object)
    }
    async updateFolder(folder){
        return await this.object.findByIdAndUpdate(folder.id,folder)
    }   
    async getObjects(condition){
        return await this.object.find(condition).exec()
    }
}

export default objectRepos
