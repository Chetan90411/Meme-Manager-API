import express, { json } from "express";
import jwt from "jsonwebtoken";

import "./src/db/mongoose";
import userRouter from "./src/router/user";
import memeRouter from "./src/router/meme";

const app = express();
const port = process.env.PORT;

app.use(json());
app.use(userRouter);
app.use(memeRouter);

app.listen(port, () => {
  console.log("Server started at port", port);
});
