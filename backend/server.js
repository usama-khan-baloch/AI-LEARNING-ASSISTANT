
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
import errorHandler from "./middlewares/errorHandle.js";
import connectDB from "./config/db.js";

// ES6 module __dirname alternative

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

//connected to mongoDB
connectDB();

// Middleware to handle cors
app.use(
    cors(
        {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true
        }
    )
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// static folders for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes)

app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
         success: false,
         error: "Route not found",
         statuCode: 404
    })
});

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});

process.on("unhandleRejection", (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
