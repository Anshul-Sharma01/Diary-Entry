import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";


const connectDb = async() => {
    try{    
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDb connected : ${connectionInstance.connection.host}`);
    }catch(err){
        console.log(`MongoDb connection failed : ${err}`);
        process.exit(1);
    }
}

export default connectDb;