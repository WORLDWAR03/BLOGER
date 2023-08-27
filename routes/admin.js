const express = require("express");
const {
  adminLogin,
  createBlog,
  Login,
  getUploads,
  adminHome,
  managePage,
  manageBlog,
  blogView,
  deletePost,
  userView,
  editUserData,
  updateUserData,
  deleteUser
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.get("/", Login);
router.post("/adminLogin", adminLogin);
router.get("/uploads", adminAuth, getUploads);
router.post("/createBlog", adminAuth, createBlog);
router.get("/adminhome", adminAuth, adminHome);
router.get("/managepage", adminAuth, managePage);
router.get("/manageblog", adminAuth, manageBlog);
router.get("/detailedView", adminAuth, blogView);
router.delete("/deletePost", adminAuth, deletePost);
router.get("/userview", adminAuth, userView);
router.get("/editUserData", adminAuth, editUserData);
router.post("/updatetUserData", adminAuth, updateUserData);
router.delete("/deleteUser",adminAuth,deleteUser)


module.exports = router;
