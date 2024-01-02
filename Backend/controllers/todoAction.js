const catchAsyncError = require('../middlewares/catchAsyncError');
const Action = require('../models/taskModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');


exports.addActivity = catchAsyncError( async(req,res,next)=>{
    const {userid,task,date,time} = req.body;
    const tasks = await Action.create({
      userid,
      task,
      date,
      time
    });
    res.status(201).json({
      success:true,
      msg:"Task Added Successfully",
      tasks
    });

});

exports.showActions = catchAsyncError( async(req,res,next)=>{

    const action = await Action.find({userid:req.user.id});
    res.status(200).json({
        msg:"Actions of the user",
        action
    });

});

exports.deleteActions = catchAsyncError( async(req,res,next)=>{

  const tasktodelete = await Action.findById(req.params.id);
  if(!tasktodelete) {
      return res.status(404).json({
          success: false,
          message: "Task not found"
      });
  }
  await Action.deleteOne({_id:req.params.id});
  res.status(200).json({
      success: true,
      message: "Task Deleted!"
  })

});


exports.getSingleTask = catchAsyncError( async(req,res,next)=>{
  const task = await Action.findById(req.params.id);
  if(!task){
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }
  res.status(201).json({
    success:true,
    task
  });
})

exports.updateTask = catchAsyncError(async (req,res,next)=>{
    let task = await Action.findById(req.params.id);
    
    if(!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    task = await Action.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        task
    })

});

exports.sendNotification = catchAsyncError( async(req,res,next)=>{

    setInterval( async ()=>{

      const today = new Date();
      let hour = today.getHours();

      if(hour<10){
        hour = 0+""+hour;
      }

      let minute = today.getMinutes();
      if(minute<10){
        minute = 0+""+minute;
      }

      const time = hour+":"+minute;    

      const year = today.getFullYear();

      let month = today.getUTCMonth()+1;
      if(month<10){
        month = 0+""+month;
      }

      let date = today.getDate();
      if(date<10){
        date = 0+""+date;
      }

      const day = year+"-"+month+"-"+date;
      
      const tasks = await Action.find({date:day , time :time});

      if(tasks.length===0){
        console.log("No task",time,day);
        return;
      }

      if(tasks.length !==0){
        tasks.map( async (task)=>{
          const user = await User.findById(task.userid);
          const message = `You have task to do \n\n Task : ${task.task} \n\n Task Time : ${task.time}`
          sendEmail({
            email:user.email,
            subject:"Task Notification",
            message
          });
        });
      }
     },1000*60);
});


exports.delectTasks = catchAsyncError(async (req,res,next)=>{
  setInterval( async()=>{
    const today = new Date();

    let hour = today.getHours();
    if(hour<10){
      hour = 0+""+hour;
    }

    let minute = today.getMinutes();
    minute=minute-1;
    if(minute<10){
      minute = 0+""+minute;
    }

    const time = hour+":"+minute;

    const year = today.getFullYear();
    
    let month = today.getUTCMonth()+1;
    if(month<10){
      month = 0+""+month;
    }

    let date = today.getDate();
    if(date<10){
      date = 0+""+date;
    }

    const day = year+"-"+month+"-"+date;
    const tasks = await Action.find({date:day , time : time});

    if(tasks.length===0){
      return;
    }

    if(tasks.length !==0){
      tasks.map(async(task)=>{
          await Action.deleteOne({_id:task._id});
      });
    }
  },1000*60);
});


// exports.sendSmsNotification = catchAsyncError(async(req,res,next)=>{

//   const accountSid = "ACc5ce29236a3dc3d677034f6db5b48b7e";
//   const authToken = "7b1038d678c599d8847c33146a74f499";

//   const client = require('twilio')(accountSid,authToken);

//   const fromPhoneNumber = '+12058510107';
//   const phonenumber = req.body;
//   console.log(phonenumber);
//   const phone = "+918925641509"

//   const messageBody = 'Hello, this is a test message from your Node.js app!';

//   client.messages
//     .create({
//       body: messageBody,
//       from: fromPhoneNumber,
//       to: phone
//     })
//     .then(message=>{
//       res.status(200).json({
//         success:true,
//         message :`Message sent. SID: ${message.sid}`
//       });
//     })
//     .catch(error =>{
//       res.status(400).json({
//         success:false,
//         message:`Error : ${error.message}`
//       })
//     })
// });

