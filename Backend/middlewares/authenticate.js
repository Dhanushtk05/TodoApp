const User = require('../models/userModel');
const catchAsyncError = require('./catchAsyncError');


const jwt = require('jsonwebtoken');


exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(401).json({
          error:'Please Login to website'
        });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});