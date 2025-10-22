import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path : "./.env" });
import morgan from "morgan";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))




app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(morgan("dev"));


import entryRouter from "./routes/entry.routes.js";
import authRouter from "./routes/auth.routes.js";

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
    next();
});

app.use("/auth", authRouter);
app.use("/diary", entryRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});







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

