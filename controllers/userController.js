import { cookieObject, generateCookie } from "../essentials/cookieObject.js";
import comparePassword from "../helpers/dcrypt.js";
import generateHash from "../helpers/encrypt.js";
import { createToken, decryptToken } from "../helpers/jwt.js";
import userModel from "../models/userModel.js";

const getUserByID = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'User id is required' });
    }
    const user = await userModel.findById(id);
    res.status(200).json({ user });
}

const getUser = async (req, res) => {
    
    if (req.cookies.token) {
        const token = req.cookies.token;
        const data = decryptToken(token);

        const user = await userModel.findOne({email: data.email});
        res.status(200).json({user});
    } else {
        res.status(401).json({ error: 'Session expired please Login' });
    }
}

const getUserTest = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await userModel.findOne({email});
        if(user.name){
            if(comparePassword(password, user.password)){
                const token = createToken({ email: user.email })
                
                res.cookie("token", token, generateCookie())
                res.send('success')
            }else{
                res.status(401).json({ error: 'Invalid Credentials' });
            }
        }else{
            res.status(404).json({ error: 'Invalid Credentials' });
        }
    } else {
        res.status(401).json({ error: 'email and password required' });
    }
}

const addUserToDB = async (req, res) => {
    try {
        const { name, email, image, mobile, birthDate, password, gender, state, district, role, userCategory, art, objective, isActive, createdAt, updatedAt } = req.body;
        const hashedPSW = generateHash(password)

        const user = await userModel.create({ name, email, image, mobile, birthDate, password: hashedPSW, gender, state, district, role, userCategory, art, objective, isActive, createdAt, updatedAt });
        const token = createToken({ email: user.email })
        res.cookie("token", token, generateCookie())
        res.send('registered Successfully');
    } catch (error) {

        res.status(500).json({ error });
    }

}

//remove user
const removeUserFromDB = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    // const deletedUser = await userModel.findByIdAndDelete(_id);
    // res.status(201).json({deletedUser});
}

//Login user
const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;
    if (email && password) {
        try {
            const user = await userModel.findOne({ email });
            if (!user.name) {
                res.status(401).json({ error: 'Invalid Credentials' });
                return;
            }
            const result = comparePassword(password, user.password);
            if (result) {
                user.isLoggedIn = true;
                await user.save()
                if (rememberMe) {
                    res.cookie("token", createToken({ email: user.email }), generateCookie(30)).json(user)
                } else {
                    res.cookie("token", createToken({ email: user.email }), generateCookie()).json(user)
                }
            } else {
                res.status(401).json({ error: 'Invalid Credentials' });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else{
        res.status(400).json({ error: 'Email and Password are required' });
    }
}

const logoutUser = async (req, res) => {
    try {
        if (req.cookies.token) {
            const token = req.cookies.token;
            const data = decryptToken(token);

            await userModel.findOneAndUpdate(
                { email: data.email },
                { isLoggedIn: false }
            );
        } else {
            return res.status(400).json({ error: 'No token found, user not logged in.' });
        }

        res.cookie("token", "", generateCookie()).send('Logged Out Successfully');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal Server Error during logout' });
    }
}

export { getUserByID, getUser, addUserToDB, removeUserFromDB, loginUser, getUserTest, logoutUser }