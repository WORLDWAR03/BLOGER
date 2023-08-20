const { response } = require('express')
const mongoose=require('mongoose')
const USER=require('../models/userModel').users
const BLOGS=require('../models/blogSchema')
const jwt =require('jsonwebtoken')

const loginPage =(req,res)=>{
    if(req.cookies.userJwt){
        res.redirect('/home')
    }else{
        res.render('user/login.hbs')
    }

}
const showSignup =((req,res)=>{
    res.render('user/signup.hbs')
})

const doSignUp=(req,res)=>{
    console.log(req.body)
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
}

const doLogin=(req,res)=>{
   USER.find({email:req.body.email,password:req.body.password})
   .then((response)=>{
    if(response.length > 0){

    const token= jwt.sign({userId:response[0]._id},"securitykey",{
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
}

const getHomePage=(req,res)=>{
    BLOGS.find().then((response)=>{
    res.render('user/home.hbs',{data:response})
})
}

const detailedView=(req,res)=>{
   console.log( req.query);
    BLOGS.find({_id:req.query.id}).then(response=>{
        console.log(response);
        res.render('user/detailedView.hbs',{data:response[0]})
    })
   
}

const logout=(req,res)=>{

    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
    })
    req.cookies.userJwt=null
    res.redirect('/')
}







module.exports={doSignUp,loginPage,showSignup,doLogin,getHomePage,detailedView,logout}