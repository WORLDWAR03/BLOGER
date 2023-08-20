const express=require('express');
const { doSignUp,loginPage,showSignup,doLogin,getHomePage,detailedView,logout} = require("../controllers/userController");
const userAuth=require('../middleware/userAuth')
const router =express.Router();



router.get("/",loginPage);
router.get('/signup',showSignup)
router.post('/register',doSignUp)
router.post('/login',doLogin)
router.get('/home',userAuth,getHomePage)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',logout)




module.exports=router