import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(String(process.env.MONGO_URI))
        console.log('>> DB connected successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB