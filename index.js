import express, { json } from "express";
import jwt from "jsonwebtoken";

import { connectDB } from "./src/db/mongoose.js";
import userRouter from "./src/router/user.js";
import memeRouter from "./src/router/meme.js";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(json());
app.use(userRouter);
app.use(memeRouter);
app.use(express.static('./public'))

app.listen(port, () => {
  console.log("Server started at port", port);
});
