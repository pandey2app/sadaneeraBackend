import { generateCookie } from "../essentials/cookieObject.js";
import comparePassword from "../helpers/dcrypt.js";
import generateHash from "../helpers/encrypt.js";
import { createToken, decryptToken } from "../helpers/jwt.js";
import userModel from "../models/userModel.js";

const getUserByID = async (req, res) => {
    const user = await userModel.findById(id);
    res.status(200).json({ user });
}

const getUser = async (req, res) => {
    if (req.cookies.token) {
        const token = req.cookies.token;
        const data = decryptToken(token);
        console.log(data);

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
        if(user){
            if(comparePassword(password, user.password)){
                const token = createToken({ email: user.email })
                console.log(token)
                
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
        console.log(error);

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
    console.log(email, password, rememberMe);
    if (email && password) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                res.status(401).json({ error: 'Invalid Credentials' });
                return;
            }
            const result = comparePassword(password, user.password);
            if (result) {
                if (rememberMe) {
                    console.log(generateCookie(30));
                    res.cookie("token", createToken({ email: user.email }), generateCookie(30)).send('Welcome mr. ' + user.name);
                } else {
                    console.log(generateCookie());
                    res.cookie("token", createToken({ email: user.email }), generateCookie()).send('Welcome mr. ' + user.name);
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

export { getUserByID, getUser, addUserToDB, removeUserFromDB, loginUser, getUserTest }