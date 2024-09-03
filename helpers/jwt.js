import jwt from "jsonwebtoken";

export const createToken =(data)=>{
    return jwt.sign(data, process.env.SERURE_KEY)
} 

export const decryptToken = (token) => {
    return jwt.verify(token, process.env.SERURE_KEY)
}