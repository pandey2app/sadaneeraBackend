import bcrypt from "bcrypt"

const generateHash = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);        
}

export default generateHash 