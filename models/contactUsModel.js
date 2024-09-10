import mongoose from 'mongoose';

const contactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'A message to sadaneera',
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{Timestamp: true})

export default mongoose.model('contactUsForm', contactUsSchema)