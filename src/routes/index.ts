import fs from 'fs/promises'
// import * as url from 'url';
import { Router } from 'express';

const router = Router()
async function method(){
    // const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    
    const listFiles = await fs.readdir(__dirname)
    listFiles.forEach(async (fileName)=>{
        if (fileName !== 'index.ts') {
            const cleanName = fileName.split('.')[0]
            const { default: moduleRouter } = await import(`./${fileName}`)
            router.use(`/${cleanName}`,moduleRouter)
        }
    })
} 
method()
export default router

