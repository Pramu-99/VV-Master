const mongoose=require('mongoose');

const equipmentSchema=new mongoose.Schema({
    itemtype:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('equipments',equipmentSchema);