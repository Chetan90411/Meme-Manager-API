const mongoose=require('mongoose');
const validator=require('validator');

const bcrypt=require('bcryptjs');
const saltRounds=8;

const  jwt=require('jsonwebtoken');

const Meme=require('./Meme');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
        validate(value){
            if(value.includes('password')){
                throw new Error("Password can't be equal to password");
            }
        }
    },
    age:{
        type:Number,
        min:12,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});

userSchema.virtual('memes',{
    ref:'Meme',
    localField:'_id',
    foreignField:'owner'
})

// Hashing the plain text password before saving
userSchema.pre('save',async function(next){
   const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password, saltRounds);    
    }
    next();
});

userSchema.pre('remove',async function(next){
    const user=this;
    await Meme.deleteMany({owner:user._id});
    next();
})

// statics method on the user schema
userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error('Unable to Login');
    }
        
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to Login');
    }
        
    return user;
}

userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id.toString()},'secretKey');
    user.tokens.push({token});
    await user.save();
    return token;
}

userSchema.methods.getPublicProfile=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

const User=mongoose.model('User',userSchema);

module.exports=User;

