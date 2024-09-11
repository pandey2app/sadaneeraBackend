import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},
    {
        timestamps: true
    });

export const Comment = mongoose.model('Comment', commentSchema);