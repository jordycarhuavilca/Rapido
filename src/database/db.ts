import mongoose from 'mongoose';

const db = {
    connect : async () => {
        try {
            const mongodbUri = `${process.env.MONGO_SRV}${process.env.DATABASE}`;
            mongoose.connection.on('error', err=>{
                console.log(`error ${err}`)
            })
            mongoose.connection.on('disconnected', err=>{
                console.log(`error disconnected ${err}`)
            })
            return await mongoose.connect(mongodbUri,{
                serverSelectionTimeoutMS : 2000,
                socketTimeoutMS: 2500
            });
        } catch (error) {
            console.log(`trycatch error ${error}`)
        }
    }
}
export default db;
