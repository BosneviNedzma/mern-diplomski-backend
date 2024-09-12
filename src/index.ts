import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myStoreRoute from "./routes/MyStoreRoute";
import storeRoute from "./routes/StoreRoute";
import orderRoute from "./routes/OrderRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to database."));

const app = express();
const corsOptions = {
    origin: ['https://mern-epijaca-frontend.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/store", myStoreRoute);
app.use("/api/store", storeRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
    console.log("Server started on port 7000.");
})