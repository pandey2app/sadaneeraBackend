import dotenv from 'dotenv';
dotenv.config()
import express  from 'express'
const app = express();
import cors from 'cors';

import path from 'path';


import users_routes from'./routes/usersRouter.js'
import contactUs_routes from'./routes/contactUsRouter.js'
import connectDB from './db/connect.js'

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Configure CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send('okay im live')
})

app.use('/api/users', users_routes)
app.use('/api/contactUs', contactUs_routes)


const start = async ()=>{
    try {        
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, ()=>{
            console.log(`listening on ${port}`);            
        });
    } catch (error) {
        console.log('hii i am not listening');
        
        console.log(error);
    }
}
start();
