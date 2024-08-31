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
            values: ['user', 'writer', 'poet', 'actor', 'singer'],
            message : "The category should be only user, writer, poet, actor, singer"
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

userSchema.pre('save', function (next) {
    if (!this.image) {
        switch (this.gender) {
            case 'male':
                this.image = '/images/maleUser.png'; 
                break;
            case 'female':
                this.image = '/images/femaleUser.png';
                break;
            default:
                this.image = '/images/maleUser.png';
                break;
        }
    }
    next();
});

export default mongoose.model('User', userSchema);