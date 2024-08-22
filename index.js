import express from 'express';
import serverless from 'serverless-http';
import connectDB from './db/connect.js';
import usersRoutes from './routes/usersRouter.js';

const app = express();

app.use(express.json());
app.use('/api/users', usersRoutes);

app.get('/', async (req, res) => {
    try {
        console.log('Connecting to the database...');
        await connectDB(process.env.MONGODB_URL);
        console.log('Database connected.');
        res.send('Hello, I am live!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default serverless(app);
