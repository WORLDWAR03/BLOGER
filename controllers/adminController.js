
const { response } = require('express')
const mongoose=require('mongoose')
const multer= require("multer")
const BLOGS=require('../models/blogSchema')
const USER=require('../models/userModel').users


const Login=(req,res)=>{
    res.render('admin/adminLogin.hbs')
}




const adminLogin=(req,res)=>{
    USER.find({email:req.body.email,password:req.body.password})
    .then((response)=>{
     if(response.length > 0){
         res.status(200).json({login:true})
     }else{
       res.json({login:false})
     }
 
    })

 }
 
 const getUploads=(req,res)=>{
     
    res.render('admin/uploads.hbs')

}
 


 

const createBlog =(req,res)=>{
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads");
    },
    filename:(req,files,cb)=>{
        cb(null,Date.now()+"-"+files.originalname)
    }
})
const upload=multer({storage:fileStorage}).array("images",3)

upload(req,res,(err)=>{
    console.log(req.files);
    BLOGS({heading:req.body.heading,
        category:req.body.category,
    content:req.body.content,
    images:req.files,
}).save().then(response=>{
    res.redirect('/admin/uploads')
})
})
}




module.exports= {Login,adminLogin,createBlog,getUploads}
