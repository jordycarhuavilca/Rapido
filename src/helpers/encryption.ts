import bcrypt from 'bcrypt'
const encryption = {
    hashPassword: async (password)=>{
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    },
    comparePassword : async (password,hash) => {
        return await bcrypt.compare(password,hash)
    }
    
}

export default encryption