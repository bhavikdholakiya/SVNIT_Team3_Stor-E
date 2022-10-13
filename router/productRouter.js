const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product=require("../models/product");
const isAuth=require("../config/isAuth");
const jwt=require("jsonwebtoken");
function sortBy(field){
    return function(a,b){
        return (a[field] < b[field])-(a[field]>b[field])
    };
}
function sortBy1(field){
    return function(a,b){
        return ((new Date(a[field]).getTime()) <(new Date(b[field]).getTime()))-((new Date(a[field]).getTime())>(new Date(b[field]).getTime()))
    };
}
router.route('/')
    .post(async (req, res, next) => {
        try {
            const product = await Product.create(req.body);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }
        catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            res.statusCode = 200;
            res.render('productpage');
        }
        catch (err) {
            next(err);
        }
    })
    function avg_rating (obj) {
        let average = 0;
        for (let i = 0; i < obj.comments.length;i++) {
          average += obj.comments[i].rating;
        } 
        return (average/obj.comments.length).toPrecision(2);
      }
router.route('/uploadcomments')
    .post(isAuth,async (req, res, next) => {
        try {
            let product = await Product.findById(req.query.id).populate([
                {
                    path:"comments",
                    populate:{path:"author"}
                }
            ]);
            console.log(product);
            let ind=-1;
            console.log(product.comments.length);
            for(let i=0;i<product.comments.length;i++)
            {
                if(product.comments[i].author._id.toString()===req.user._id.toString())
                {
                    ind=i;
                }
            }
            console.log(ind);
            if(ind!=-1)
            {
                product.comments[ind].rating=req.body.rating;
                product.comments[ind].reviews=req.body.reviews;
            }
            else{
                product.comments.push({ reviews: req.body.reviews, rating: req.body.rating, author: req.user._id });
            }
            const user=await User.findById(req.user._id,['name']);
            product.ratingNumber=avg_rating(product);
            await product.save();
            res.send(user);
        }
        catch (err) {
            next(err);
        }
    })
    router.get('/:id',async(req,res,next)=>{
        let singleProduct=await Product.findById(req.params.id).populate([
            {
                path:"comments",
                populate:{path:"author"}
            }
        ]);
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
        for(let i=0;i<singleProduct.comments.length;i++)
        {
            let x=new Date(singleProduct.comments[i].updatedAt).getTime();
            singleProduct.comments[i].date=x;
        }
        console.log(singleProduct.comments);
        if(req.query.sort==="1")
        {
            singleProduct.comments.sort(sortBy('date'));
        }
        else{
            singleProduct.comments.sort(sortBy('rating'));
        }
        // await singleProduct.save();
        res.render('product',{product:singleProduct,user});
    })
module.exports = router;