const blogModel = require("../models/blogModels");
const UserModel = require("../models/usersModels");
const mongoose = require("mongoose");
// get all blogs :
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (blogs.length === 0) {
      return res
        .status(200)
        .json({ message: "No blogs found", success: true, blogs: [] });
    }
    return res.status(200).json({
      message: "Blogs fetched successfully",
      success: true,
      blogs,
      blogCount: blogs.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error while getting blogs ",
      success: false,
      error,
    });
  }
};
// create new blog :
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;
    // validation :
    if (!title || !description || !image || !userId) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // we are first checking that user is registered or not  , as it is required to create the blog .
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "unable to find user" });
    }
    // creating the blog with the user id
    const newBlog = new blogModel({ title, description, image, userId });
    const session = await mongoose.startSession();
    // starting the transaction
    session.startTransaction();
    // saving the blog in the database
    await newBlog.save({ session });
    // linking the blog with the user .
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res
      .status(201)
      .json({ message: "Blog created successfully", success: true, newBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error while creating blog ",
      success: false,
      error,
    });
  }
};
// update blog :
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    // this new : true will return the updated blog . if not used it will return the old blog .
    // we can also use {useValidators:true} to run the validators of schema again on update .

    return res
      .status(200)
      .json({ message: "Blog updated successfully", success: true, blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while updating blog ",
      success: false,
      error,
    });
  }
};
// delete blog :
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // Populate : means we are replacing the id with the whole document of user .
    const blog = await blogModel.findByIdAndDelete(id).populate("userId");
    // we are deleting blog from the connected users also .
    await blog.userId.blogs.pull(blog);
    await blog.userId.save();
    console.log("deleted:", blog);
    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while deleting blog ",
      success: false,
      error,
    });
  }
};
// get blog by id :
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Blog fetched successfully", success: true, blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while getting blog by id",
      error,
      success: false,
    });
  }
};

exports.userBlogs = async (req, res) => {
  try {
    const userId  = req.params.id;
    // console.log(userId)
    const userAndBlogs = await UserModel.findById(userId).populate("blogs");

    if (!userAndBlogs) {
      return res
        .status(404)
        .json({ success: false, message: "blogs not found with this Id" });
    }
    return res.status(200).json({success:true,message:"user Blogs",userAndBlogs})
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({
        success: false,
        message: "error while getting user blogs",
        error,
      });
  }
};
