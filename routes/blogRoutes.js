const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} = require("../controllers/blogControllers");

// router object to perform routing :
const router = express.Router();
// get all blogs || GET :
router.get("/all-blogs", getAllBlogs);

// craete new Blog || POST :
router.post("/create-blog", createBlog);

// update blog || PUT :
router.put("/update-blog/:id", updateBlog);

// delete blog || DELETE :
router.delete("/delete-blog/:id", deleteBlog);

// get blog by id || GET :
router.get("/get-blog/:id", getBlogById);

module.exports = router;
