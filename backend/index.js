import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("This is the route");
});

app.use("/auth", userRouter);

db();

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
