import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
let databaseUrl = process.env.mongoDB_url
const connectDb = async () => {
    try {
        await mongoose.connect(databaseUrl, { useNewUrlParser: true })
        console.log("database connected successfully");
        return "successfully"
    } catch (error) {
        console.log('Error while connecting with database', error);
        return Promise.reject(error)
    }
}


export default connectDb;