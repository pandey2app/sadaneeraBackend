import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
    },
    role: {
        type: String,
        default: 'member'
    },
    userCategory: {
        type: String,
        enum: {
            values: ['user', 'writer', 'poet', 'actor', 'singer'],
            message : "The category should be only user, writer, poet, actor, singer"
        },
        default: 'user'
    },
    art: {
        type: String,
        default: 'reader'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})
export default mongoose.model('User', userSchema);