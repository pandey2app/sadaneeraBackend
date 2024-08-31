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
        default: 'member'
    },
    userCategory: {
        type: String,
        enum: {
            values: ['reader', 'writer', 'poet', 'actor', 'singer'],
            message : "The category should be only reader, writer, poet, actor, singer"
        },
        default: 'user'
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

const root = 'https://sadaneera-backend.vercel.app'
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