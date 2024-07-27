const express=require('express');
const app=express();
const PORT=8001;
const bodyParser=require('body-parser');
const cors = require("cors");
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));
const messageRouter = require('./Routes/sendmessageRoute');
app.use(bodyParser.json())
app.use('/api', messageRouter); 
app.listen(PORT,(req,res)=>{
console.log(`App is listening at ${PORT}`);
})