import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        throw new Error("MONGODB connection FAILED")
    }    
}
export default connectDB