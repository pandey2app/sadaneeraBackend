import { decryptToken } from "../helpers/jwt.js";
import userModel from "../models/userModel.js";

const getUser = async (req, res, next) => {
    console.log(req.cookies.token);
    
    try {
        if (!req.cookies.token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const token = req.cookies.token;
        const { email } = decryptToken(token);
        const user = await userModel.findOne({ email }).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export default getUser;