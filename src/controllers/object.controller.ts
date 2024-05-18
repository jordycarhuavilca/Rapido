import objectServ from "../services/object.service.js"
const objectController = {
    addObject : async (req , res)=> {
        let listObject = []
        const files = req.files || []
        const folder = req.body
        const userId = req.params.userId

        if(files.length == 0 && Object.keys(folder).length == 0) 
        return res.status(422).json({
            error  : true,
            message: 'server cannot process the request because it doesnt contain any data',
        })

        if (files.length > 0) listObject = files
        else{
            listObject = folder 
            if (Object.keys(listObject[0]).length != 7 )
            return res.status(422).json({
                error  : true,
                message: 'umcompleted fields',
            })
        }

        try {
            const data = await objectServ.addObject(listObject,userId)
            if (data.length > 0)
            res.status(201).json({
                message : 'created successfully',
                data : data
            })
            else 
            res.status(500).json({
                error : true,
                message : 'It cannot process the expected action',
            })

        } catch (error) {
            const statusCode = error.statusCode || 500
            res.status(statusCode).json({
                error : true,
                message : error.message
            })
        }

    },
    addSubObjects : async (req,res) => {
        const listFiles = req.files || []
        let listObjs = []
        const obj = req.body
        const pathNames = obj.pathNames
        const userId = req.params.userId

        if (!pathNames) return res.status(422).json({
                error : true,
                message : 'pathIds is missing'
        })
        if (!userId) return res.status(422).json({
            error : true,
            message : 'userId is missing'
        })

        if (listFiles.length == 0) listObjs.push(obj) 
        else listObjs = [...listFiles]

        const data = await objectServ.addSubObjects(pathNames,listObjs,userId)
        
        res.status(201).json({
            message : 'created successfully',
            data : data
        })
    },
    getObject : async (req , res) => {

    }
}


export default objectController