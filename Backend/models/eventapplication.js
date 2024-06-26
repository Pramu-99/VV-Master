const mongoose=require('mongoose');
const applySchema=new mongoose.Schema({
    userregno:{
        type:String,
        required:true
    },
    event:{
        type:String,
        required:true
    },
    roleapply:{
        type:String,
        required:true
    },
     status:{
        type:Boolean,
        required:true
    },
    marks:{
        type:Number,
        require:true
    }
});

module.exports=mongoose.model('applies',applySchema);
