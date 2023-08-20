const express=require('express');
const {adminLogin,createBlog,Login,getUploads}= require("../controllers/adminController")
const router= express.Router();

router.get('/',Login)
router.post('/adminLogin',adminLogin)
router.get('/uploads',getUploads)
router.post('/createBlog',createBlog)




module.exports=router