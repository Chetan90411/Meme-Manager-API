const mongoose=require('mongoose');

const memeSchema=new mongoose.Schema({
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
    },
    tag: [String]
},{
    timestamps:true
});

const Meme=mongoose.model('Meme',memeSchema);

module.exports=Meme;
