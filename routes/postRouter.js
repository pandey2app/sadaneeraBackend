import express from 'express';
import getUser from '../middlewares/getUserMiddleware';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController';

const router = express.Router();

router.post('/create', getUser, createPost)
router.get('/delete/:id', deletePost);
router.get('/update/:id', updatePost);
router.get('/:id', getPostById)


router.get('/', getAllPosts)

export default router;