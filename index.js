import dotenv from 'dotenv';
dotenv.config()
import express  from 'express'
import serverless from 'serverless-http';
const app = express();

import users_routes from'./routes/usersRouter.js'
import connectDB from './db/connect.js'

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('okay im live')
})

app.use('/api/users', users_routes)

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

export default serverless(app);