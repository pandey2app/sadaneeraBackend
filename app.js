import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( __dirname + '/public'));
app.use(cookieParser());

// Routes
import users_routes from'./routes/usersRouter.js'
import user_routes from'./routes/userRouter.js'
import contactUs_routes from'./routes/contactUsRouter.js'
import post_routes from'./routes/postRouter.js'
import file_routes from'./routes/fileRouter.js'

app.get('/', (req, res) => {
    res.send('okay im live')
})

app.use('/api/users', users_routes)
app.use('/api/user', user_routes)
app.use('/api/contactUs', contactUs_routes)
app.use('/api/post', post_routes)
app.use('/api/file', file_routes)

export default app;