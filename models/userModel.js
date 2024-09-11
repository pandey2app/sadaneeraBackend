import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true,
        lowercase: true,
        trim: true
    },
    image:{
        type: String,
    },
    birthdate:{
        type: Date,
    },
    mobile: {
        type: String,
        required: [true, 'mobile must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message : "The gender should be only male, female, or other"
        }
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "member", "editor"],
            message: "The role should be only admin, member, or editor"
        },
        default: 'member',
        lowercase: true,
    },
    userCategory: {
        type: String,
        enum: {
            values: ['reader', 'writer', 'poet', 'actor', 'singer'],
            message : "The category should be only reader, writer, poet, actor, singer"
        },
        default: 'user',
        lowercase: true,
    },
    art: {
        type: String,
        default: 'reader'
    },
    objective: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{timestamps: true})

const root = process.env.BACKEND_URL
userSchema.pre('save', function (next) {
    if (!this.image) {
        switch (this.gender) {
            case 'male':
                this.image = root+'/img/maleUser.png'; 
                break;
            case 'female':
                this.image = root+'/img/femaleUser.png';
                break;
            default:
                this.image = root+'/img/maleUser.png';
                break;
        }
    }
    next();
});

export default mongoose.model('User', userSchema);