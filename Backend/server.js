const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path:path.join(__dirname,'config/config.env')});
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log("Server is Listening...");
});

