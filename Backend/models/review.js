const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    userregno:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    reviewmsg:{
        type:String,
        required:true
    }
});
