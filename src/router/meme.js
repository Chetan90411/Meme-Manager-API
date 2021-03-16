const express=require('express');
const router=express.Router();

const Meme=require('../model/Meme');
const auth=require('../middleware/auth');

router.post('/memes',auth,async (req,res)=>{
    const meme=new Meme({...req.body,owner:req.user._id});
    try {
        await meme.save();
        res.status(200).send(meme);
    } catch (error) {
        res.status(500).send(error);
    }
})

// GET /memes?limit=10
router.get('/memes', auth,async (req,res)=>{

    try {
        await req.user.populate({
            path:'memes',
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
           
        }).execPopulate();
        res.status(200).send(req.user.memes);
    } catch (error) {
        res.status(500).send(error);
    }

}) ;

router.get('/memes/:id', auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const meme=await Meme.findOne({_id,owner:req.user._id})
        if(!meme){
            return res.status(204).send();
        }
        res.send(meme);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/memes/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const meme=await Meme.findOneAndDelete({ _id, owner:req.user._id});
        if(!meme){
            return res.status(404).send();
        }
        res.send(meme);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/memes/:id', auth,async (req,res)=>{

    const allowedUpdates=['description','imgLink'];
    const updates=Object.keys(req.body);

    const isValidOperation=updates.every(update=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(404).send({error:'Invalid update operation'});
    }

    const _id=req.params.id;
    try {
        const meme=await Meme.findOne({_id,owner:req.user._id});
        if(!meme){
            return res.status(400).send();
        }
        updates.forEach(update=>{
            meme[update]=req.body[update];
        })
        await meme.save();
        res.send(meme);
    } catch (error) {
        res.send(error)
    }

});

module.exports=router;