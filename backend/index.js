import mongoose from "mongoose";
import users from "./routes/user.js";
import auth from "./routes/auth.js";

import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

mongoose
  .connect(
    "mongodb+srv://singlas106:shubham@cluster0.bof7vyj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: ["http://localhost:3001", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.get("/uploads/:path", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.path);
});

const port = process.env.PORT || 5000;
app.get("/uploads/:path", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.path);
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
