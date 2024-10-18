import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Import the router
import { userRouter } from "./routes/users.js";
import { receipeRouter } from "./routes/receipes.js";


const app = express();

// Use JSON middleware
app.use(express.json());

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({
    origin: 'https://receipeapp-beta.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Use the user router
app.use("/auth", userRouter);
app.use("/receipes", receipeRouter);


// Start the server
app.listen(3001, () => console.log("Server started on port 3001"));

// Database connectivity
mongoose.connect('mongodb+srv://sudarsanraj14:E0PghpRWZwsd8HpH@mymongodb.g874n.mongodb.net/reciepeees').then(() => {
    console.log("DB connected");
});
