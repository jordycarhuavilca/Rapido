import app from "./app";
import db from "./database/db";
const PORT = process.env.SERVER_PORT

async function run(){
    try {
        await db.connect()
        console.log('Connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
    app.listen(PORT,()=>{
        console.log(`the server is running on the port ${PORT}`)
    })
}

run()