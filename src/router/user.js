const express = require("express");
const router = new express.Router();
const multer=require('multer');
const sharp=require('sharp');

const User = require("../model/User");
const auth=require('../middleware/auth');


router.post("/users", async (req, res) =>  {
  const user = new User(req.body);
  try {
    await user.save();
    const token=await user.generateAuthToken();
    res.status(201).send({user:user.getPublicProfile(),token});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token=await user.generateAuthToken();
    res.send({user:user.getPublicProfile(),token});
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/logout',auth,async (req,res)=>{
  try {
        const user=req.user;
          user.tokens=user.tokens.filter(tokenObject=>{
              return tokenObject.token!=req.token;
          })
        
        await user.save();
        res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.post('/users/logoutAll',auth,async (req,res)=>{
  try {
    const user=req.user;
    user.tokens=[];
    await user.save();
    res.status(200).send('Successfully Logout of All sessions');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth,async (req, res) => {
  res.send(req.user);
});

router.delete("/users/me", auth,async (req, res) => {
  try {
      await req.user.remove();
      res.send(req.user.getPublicProfile());
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/me", auth,async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid updates operation" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user.getPublicProfile());
  } catch (error) {
    res.status(500).send(error);
  }
});

const upload=multer({
  limits:{
    fileSize:2000000
  },
  fileFilter( req, file, cb){
      if(file.originalname.endsWith('.jpg')||file.originalname.endsWith('.jpeg')||file.originalname.endsWith('.png')){
        return cb(undefined,true);
      }
      cb(new Error('Please upload an image file'));
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
  req.user.avatar=await sharp(req.file.buffer).resize(250,250).png().toBuffer();
  await req.user.save();
  res.send();
},(error,req,res,next)=>{
  res.status(400).send({error:error.message});
})

module.exports = router;
