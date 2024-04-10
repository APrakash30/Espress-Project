import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connection.js";
// import userModel from "./models/user.model.js";
import UserRouter from "./routes/user.router.js";
import PostRouter from "./routes/post.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT | 9000;

app.use("/user", UserRouter);
app.use("/api/post", PostRouter);

app.listen(PORT, async () => {
  console.log("Server is running on PORT", PORT);
  await connectDB();
});
