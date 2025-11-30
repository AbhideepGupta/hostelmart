import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import postRoutes from "./routes/postRouter.js";
import cors from "cors";


dotenv.config();
let port = process.env.PORT || 6000;



let app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("yo yo server is running");
});

app.listen(port, () => {
    connectdb();
    console.log("server running at port " + port);
});
