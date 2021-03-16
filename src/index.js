const express=require('express');
const jwt=require('jsonwebtoken');

require('./db/mongoose');
const userRouter=require('./router/user');
const memeRouter=require('./router/meme');

const app=express();
const port=process.env.PORT;


app.use(express.json());
app.use(userRouter);
app.use(memeRouter);

app.listen(port,()=>{
    console.log('Server started at port',port);
});

