const mongoose=require('mongoose');
const applySchema=new mongoose.Schema({
    userregno:{
        type:String,
        required:true
    },
