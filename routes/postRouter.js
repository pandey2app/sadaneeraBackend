import express from 'express';
import getUser from '../middlewares/getUserMiddleware.js';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create', getUser, createPost);

router.delete('/delete/:id', getUser, deletePost);

router.put('/update/:id', getUser, updatePost);

router.get('/:id', getPostById);

router.get('/', getAllPosts);

export default router;
