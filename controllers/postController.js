import { Post } from "../models/postModel.js";

// Create a new post
const createPost = async (req, res) => {
    const { title, content, tags, image } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newPost = await Post.create({
            title,
            content,
            tags,
            image,
            author: req.user._id
        });

        return res.status(201).json({ message: 'Post added successfully', newPost });
    } catch (error) {
        return res.status(500).json({ error: 'Server error while creating post' });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email').exec();
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Get post by ID
const getPostById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email').exec();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: 'Server error while fetching post' });
    }
};

// Update a post
const updatePost = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    if (!req.body) {
        return res.status(400).json({ error: 'No data provided to update' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author', 'name email').exec();

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.json(updatedPost);
    } catch (error) {
        return res.status(500).json({ error: 'Server error while updating post' });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        return res.status(500).json({ error: 'Server error while deleting post' });
    }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
