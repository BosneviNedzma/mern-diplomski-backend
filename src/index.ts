import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myStoreRoute from "./routes/MyStoreRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database."));

const app = express();
const corsOptions = {
    origin: 'https://mern-epijaca-frontend.onrender.com', // Dozvoli samo ovaj domen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.json());
app.use(cors(corsOptions));

app.get("/health", async (req:Request, res:Response) => {
    res.send({message:"health OK!"});
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/store", myStoreRoute);

app.listen(7000, () => {
    console.log("Server started on port 7000.");
})