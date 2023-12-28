const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwt');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

//route - /api/user/register
exports.registerUser = catchAsyncError(async (req,res,next)=>{

    const {name,email,password} = req.body;
    const data = await User.findOne({email:email});
    if(data){
        res.status(400).json({
            message:"Email Already Exisits"
        });
    }
    const user = await User.create({
        name,
        email,
        password
    });

    sendToken(user,201,res);

});

//route = /api/user/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            message:"Please Enter the Email and Password"
        });
    }
    const user = await User.findOne({email:email}).select('+password');
    if(!user){
        res.status(400).json({
            message:"Invalid Email or Password"
        });
    }
    if(!await user.isValidPassword(password)){
        res.status(400).json({
            message:"Invalid Email or Password"
        });
    }
    sendToken(user,200,res);

});

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
         success:true,
         user
    })
 })


exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success:true,
        message : 'User found',
        user
    });
});

exports.logoutuser = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    });

});


exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
    const user =  await User.findOne({email: req.body.email});

    if(!user) {
        return  res.status(400).json({
            message:"Email Not found"
        });
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "Password Reset Mail",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        res.status(400).json({
            message:"Email Not found"
        });
    }

});  

exports.resetPassword = catchAsyncError( async (req, res, next) => {
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
 
     const user = await User.findOne( {
         resetPasswordToken,
         resetPasswordTokenExpire: {
             $gt : Date.now()
         }
     } )
     
     if(!user) {
        res.status(400).json({
            message:'Password reset token is invalid or expired'
        });
     }
 
     if( req.body.password !== req.body.confirmPassword) {
        res.status(400).json({
            message:'Password does not match'
        });
     }
 
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordTokenExpire = undefined;
     await user.save({validateBeforeSave: false});
     sendToken(user, 201, res);
 
 });


