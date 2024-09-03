import dotenv from 'dotenv';
dotenv.config()
import express  from 'express'
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import path from 'path';
import { fileURLToPath } from 'url';


import users_routes from'./routes/usersRouter.js'
import user_routes from'./routes/userRouter.js'
import contactUs_routes from'./routes/contactUsRouter.js'
import connectDB from './db/connect.js'

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Serve static files from the public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
// Configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('okay im live')
})

app.use('/api/users', users_routes)
app.use('/api/user', user_routes)
app.use('/api/contactUs', contactUs_routes)


const start = async ()=>{
    try {        
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, ()=>{
            console.log(`listening on ${port}`);            
        });
    } catch (error) {
        console.log('Error while listening');
        
        console.log(error);
    }
}

start();
