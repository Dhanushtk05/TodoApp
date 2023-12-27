const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[true,'Please Enter the Name']
    },

    email:{
        type:String,
        required:[true,'Please Enter the Email'],
        unique:true,
        validate:[validator.isEmail,'Please Enter the valid Email']
    },

    password:{
        type:String,
        required : [true,'Please Enter the Vaild password'],
        maxlength:[12,'Password Should not exceed maximum Length 12'],
        minlength:[8,'Password should be above length 8']
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
       expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.isValidPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetToken = function(){
    
    const token = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}

let model = mongoose.model('User',userSchema);

module.exports = model;