const mongoose=require('mongoose');
const reservationSchema=new mongoose.Schema({
    itemid:{
        type:Array,
        required:true
    },
    userregno:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
});
