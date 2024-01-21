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

app.set("view engine", "ejs");
app.set('views', "./public/html")
app.use(express.static('./public'))

app.get('/login', (req, res) => {
  res.render('login')
})

app.listen(port, () => {
  console.log("Server started at port", port);
});
