const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    regno:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    pass:{
        type:String,
        required:true
    },
    
    linkedin:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
        required:true
    },
    instagram:{
        type:String,
        required:true
    },
    approval:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        required:true 
    }
});

module.exports=mongoose.model('posts',postSchema);