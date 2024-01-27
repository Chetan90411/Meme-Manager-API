import express, { json } from "express";
import { connectDB } from "./src/db/mongoose.js";
import userRouter from "./src/router/user.js";
import memeRouter from "./src/router/meme.js";
import publicRouter from "./src/router/public.js";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(json());
app.use(userRouter);
app.use(memeRouter);
app.use(publicRouter);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./public"));

app.listen(port, () => {
  console.log("Server started at port", port);
});
