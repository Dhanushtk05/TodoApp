const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');

//const errormiddleware = require('./middlewares/error');
const user = require('./routes/auth');
const { sendNotification, delectTasks } = require('./controllers/todoAction');

const app = express();


app.use(function(req,res,next){
    res.header("Access-Control-Allow_origin","*");
    res.header("Access-Control-Allow-Headers","*");
    next();
});


app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user/',user);
sendNotification();
delectTasks();



module.exports = app;
