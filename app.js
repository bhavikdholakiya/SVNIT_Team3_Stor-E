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
const Product = require('./models/product');
const isAuth = require('./config/isAuth');
const jwt=require("jsonwebtoken");
const User=require("./models/user");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

const connection=mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Successfully Connected to Database");
}).catch((err)=>console.log(err));


//SETTING ENGINEs
app.use(express.static('css'));

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.static("public"));
app.get('/',async (req,res)=>{
    const allProducts = await Product.find();
   
    let user;
    let token=req.cookies.jwt;
    if(token)
    {
        token =req.cookies.jwt;
        // console.log("THis is empty"+token);
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        // console.log('Hello');
        user=await User.findOne({_id:decode._id,'tokens.token':token});
    }
    
    res.render("homepage",{products:allProducts,user});
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
server.listen(process.env.PORT||3000,()=>{
    console.log('Successfully connected to Server');
});