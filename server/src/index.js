import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}))


dotenv.config({ path : "./.env" });


app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(morgan("dev"));








const PORT = process.env.PORT || 5000;

connectDb()
    .then(() => {
        console.log("Mongodb connection successfull");
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`MongoDb connection failed : ${err}`);
    })

