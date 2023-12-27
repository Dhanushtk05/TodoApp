const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'   
    },
    task:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
});


let model = mongoose.model('Action',taskSchema);
module.exports = model;

