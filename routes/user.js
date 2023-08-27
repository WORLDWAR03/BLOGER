const express=require('express');
const { doSignUp,loginPage,showSignup,doLogin,getHomePage,detailedView,logout,selectedView,userUploads,createUserBlog,go404,getUserInfo } = require("../controllers/userController");
const userAuth=require('../middleware/userAuth');
const { route } = require('./admin');
const { createBlog } = require('../controllers/adminController');
const router =express.Router();



router.get("/",loginPage);
router.get('/signup',showSignup)
router.post('/register',doSignUp)
router.post('/login',doLogin)
router.get('/home',userAuth,getHomePage)
router.get('/detailedView',userAuth,detailedView)
router.get('/useruploads',userAuth,userUploads)
router.post('/useruploads',userAuth,createUserBlog)
router.get('/accountInfo',userAuth,getUserInfo)

router.get('/404',userAuth,go404)
router.get('/selectedView',userAuth,selectedView)


router.get('/logout',logout)




module.exports=router