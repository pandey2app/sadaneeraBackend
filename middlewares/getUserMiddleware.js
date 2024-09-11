import { decryptToken } from "../helpers/jwt.js";
import userModel from "../models/userModel.js";

const getUser = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = req.cookies.token;
    const { email } = decryptToken(token);
    const user = await userModel.findOne({ email });
    req.user = user;
    next();
}

export default getUser;