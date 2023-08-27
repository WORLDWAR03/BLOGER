const { response, query } = require('express')
const mongoose=require('mongoose')
const USER=require('../models/userModel').users
const BLOGS=require('../models/blogSchema')
const jwt =require('jsonwebtoken')
const multer= require("multer")




//PAGE ENTRY

const loginPage =(req,res)=>{

    try{
    if(req.cookies.userJwt){
        res.redirect('/home')
    }else{
        res.render('user/login.hbs')
    }
    }catch(err){
        res.render('/404')
    }
}
const showSignup =((req,res)=>{
    res.render('user/signup.hbs')
})



//SIGN UP
const doSignUp=(req,res)=>{
    try{
    USER({
        email:req.body.email,
        name:req.body.name,
        lastName:req.body.lastName,
        password:req.body.password
    }).save().then((res)=>{
        res.json({signup:true})
    })
    .catch(()=>{
        res.json({signup:false})
    })
}catch(err){
    res.render('/404')
}

}

//LOGIN FUNCTION

const doLogin=(req,res)=>{

    try{
   USER.find({email:req.body.email,password:req.body.password})
   .then((response)=>{
    if(response.length > 0){

    const token= jwt.sign({userId:response[0]._id},process.env.JWT_KEY,{
        expiresIn:'2d'
    })

    res.cookie('userJwt',token,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:24*60*60*1000
    })
        res.status(200).json({login:true})

    }else{
      res.json({login:false})
    }

   })

}catch(err){
    res.render('/404')
}
}



const getHomePage=(req,res)=>{
    BLOGS.find().then((response)=>{
    res.render('user/home.hbs',{data:response})


})
}

//DETAILED VIEW

const detailedView=(req,res)=>{
   try{
    BLOGS.findOne({_id:req.query.id}).populate({path:'createdBy',select:['name','email']})
    .then(response=>{
      
        let day=convertISODataToCustomFormat(response.createdAt)
        
        response.createdAt=day;
        console.log(response.createdAt);
     
        res.render('user/detailedView.hbs',{data:response})
        
    })
}catch(err){
 res.redirect('/404')
}
   
}

//category wise data

const selectedView=(req,res)=>{
    try{
    BLOGS.find({category:req.query.id}).then(response=>{
        
        res.render('user/selectedView.hbs',{data:response})
    })

} catch (err){
    res.redirect('/404')
}
}


//LOGOUT

const logout=(req,res)=>{
    try{

    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
    })
    req.cookies.userJwt=null
    res.redirect('/')

}catch(err){
    res.render('/404')
}
}


const userUploads=(req,res)=>{

    res.render('user/useruploads.hbs')

}

//BLOG CREATER

const createUserBlog =(req,res)=>{
    
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
        
        BLOGS({heading:req.body.heading,
            category:req.body.category,
            discription:req.body.discription,
        content:req.body.content,
        images:req.files,
        createdBy:req.query.id
    }).save().then(response=>{
        res.redirect('/useruploads')
    })
    })
    }
const go404=(req,res)=>{
    res.render('/404.hbs')
}



//USER ACCOUNT FETCHING


const getUserInfo=(req,res)=>{
  USER.findOne({_id:req.query.id}).then((response)=>{
  res.render('user/userInfo.hbs',{data:response})})
}








//DATE & TIME conversion

function convertISODataToCustomFormat(isoDate){
    const dateObj =new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj).slice(4,7);
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours() % 12 || 12;
    const minutes =String(dateObj.getMinutes()).padStart(2, '0');
    const amOrPm = dateObj.getHours() >=12 ? 'PM' : 'AM';

return `${day}-${month}-${year} ${hours}:${minutes} ${amOrPm}`


}





module.exports={doSignUp,loginPage,showSignup,doLogin,getHomePage,detailedView,logout,selectedView,userUploads,createUserBlog,go404,getUserInfo}