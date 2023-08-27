const { response } = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const BLOGS = require("../models/blogSchema");
const USER = require("../models/userModel").users;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { log } = require("console");
const path = "path";

const Login = (req, res) => {
  res.render("admin/adminLogin.hbs");
};

//ADMIN LOGIN

const adminLogin = (req, res) => {
  try {
    USER.find({ email: req.body.email, password: req.body.password }).then(
      (response) => {
        if (response.length > 0) {
          const token = jwt.sign(
            { userId: response[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "2d",
            }
          );

          res.cookie("userJwt", token, {
            httpOnly: true,
            samSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ login: true });
        } else {
          res.json({ login: false });
        }
      }
    );
  } catch (err) {
    res.render("/404");
  }
};

const getUploads = (req, res) => {
  res.render("admin/uploads.hbs");
};

//BLOG CREATER

const createBlog = (req, res) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, files, cb) => {
      cb(null, Date.now() + "-" + files.originalname);
    },
  });
  const upload = multer({ storage: fileStorage }).array("images", 3);

  upload(req, res, (err) => {
    BLOGS({
      heading: req.body.heading,
      category: req.body.category,
      discription: req.body.discription,
      content: req.body.content,
      images: req.files,
    })
      .save()
      .then((response) => {
        res.redirect("/admin/uploads");
      });
  });
};

//ADMIN HOME

const adminHome = (req, res) => {
  BLOGS.find().then((response) => {
    res.render("admin/adminhome.hbs", { data: response });
  });
};

//MANAGE PAGE

const managePage = (req, res) => {
  USER.find().then((response) => {
    res.render("admin/manageUser.hbs", { data: response });
  });
};

const manageBlog = (req, res) => {
  BLOGS.find()
    .populate({ path: "createdBy", select: ["name", "email"] })
    .then((response) => {
      res.render("admin/manageBlogs.hbs", { data: response });
    });
};



const blogView = (req, res) => {
  try {
    BLOGS.findOne({ _id: req.query.id })
      .populate({ path: "createdBy", select: ["name", "email"] })
      .then((response) => {
        res.render("admin/blogView.hbs", { data: response });
      });
  } catch (err) {
    res.render("/404");
  }
};


const userView=(req,res)=>{
  try{
    USER.findOne({_id: req.query.id})
    .then((response)=>{
      res.render("admin/userView.hbs",{data:response})
      console.log(response);
    })
  }catch(err){
    res.render('/404')
  }
}


//User Data Edit$ update

const editUserData=(req,res)=>{
  try{
   USER.findById({_id:req.query.id})
   .then((userData)=>{
    res.render('admin/editUserData.hbs',{user:userData})
   })
  }catch(err){
     
    res.send('/404')
  }

}


//update UserData

const updateUserData=(req,res)=>{
     try{
        USER.findByIdAndUpdate({req:body.user_id},{ $set:{name:req.body.name, lastName:req.body.lastName, email:req.body.email}}).then(
res.redirect('/admin/userview')
        )
     }  
     catch(err){
      res.render('user/404.hbs')
     }
}


//delete Blogs

const deletePost = (req, res) => {

    try{
  BLOGS.findOne({ _id: req.body.postId }).then((selectedblog) => {
    BLOGS.deleteOne({
      _id: req.body.postId,
    }).then((resp) => {
      for (let i = 0; i < selectedblog.images.length; i++) {
        const filePath = path.join(
          __dirname,
          "..",
          "public/uploads",
          selectedblog.images[i].filename
        );
        fs.unlink(filePath,(err) => {
          console.log(err);
        });

      }
      res.json({delete:true})
    })
    .catch(err=>{
        res.json({delete:false,msg:err})
    })
  });
}catch(err){
    res.render('/404')
}
};


//deleteUser

const deleteUser=(req,res)=>{

  USER.findOne({_id: req.body.userId}).then((response)=>{
  console.log(response)
  USER.deleteOne({
    _id:req.body.userId
  }).then(res.json({delete:true})
 
  
  )

})
  
    
}




module.exports = {
  Login,
  adminLogin,
  createBlog,
  getUploads,
  adminHome,
  managePage,
  manageBlog,
  blogView,
  deletePost,
  userView,
  editUserData,updateUserData
  ,deleteUser
};
