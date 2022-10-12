const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const mongoose=require("mongoose");
require('dotenv').config();
const ejs=require("ejs");
const cookieParser=require('cookie-parser');
const userRouter=require('./router/userRouter');
const productRouter=require('./router/productRouter');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

const connection=mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Successfully Connected to Database");
}).catch((err)=>console.log(err));


//SETTING ENGINES
app.use(express.static('css'));

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.render("homepage");
})

app.use("/user",userRouter);
app.use("/product",productRouter);
//ERROR HANDLER
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    // res.setHeader('Content-Type','application/json');
    res.json({error:err.message})
  });

  //CREATING SERVER
const server=http.createServer(app);
server.listen(process.env.PORT||3000,process.env.HOST,()=>{
    console.log('Successfully connected to server');
});