import mongoose from 'mongoose'
import {ValidateError , InternalServerError} from './errorHandler'
const handleAysncError = {
    run: async (promise)=>{
        try {
            return await promise
        } catch (error) {
            console.log("HandleAsyncError " + error)

            if (error instanceof mongoose.Error.ValidatorError) {
                console.log('hola')
            }
            if(error.code == 112){
                throw new InternalServerError("Transaction failed",500)
            }
            if (error.code == 11000) {
                const keyValue = error.keyValue
                const key = Object.keys(keyValue)[0]
                const value = Object.values(keyValue)[0]
                throw new ValidateError(
                    `${key}: ${value} is already in use`,422
                )
            }
            throw new InternalServerError("Internal Server Error",500)
        }
    }
}

export default handleAysncError