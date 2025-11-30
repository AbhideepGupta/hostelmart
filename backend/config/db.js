import mongoose from "mongoose";

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected");
    }
    catch(error){
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectdb;
