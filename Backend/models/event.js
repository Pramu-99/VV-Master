const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    eventname:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    details:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('events',eventSchema);