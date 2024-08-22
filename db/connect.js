import mongoose from 'mongoose';



const connectDB = (uri)=>{
    console.log('i am connected db');
    
    return mongoose.connect(uri)
}
export default connectDB