const mongoose=require('mongoose');

const Meme=mongoose.model('Meme',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    imgLink:{
        type:String,
        trim:true,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

module.exports=Meme;