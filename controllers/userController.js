const userModel = require("../models/usersModels");
const bcrypt = require("bcrypt");
//create user register user
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // hashing password before saving to database for security purpose
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds which is the number of times the password will be hashed

    // save new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in register callback", success: false, error });
  }
}

// get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      userCount: users.length,
      message: "Users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error", success: false, error });
  }
}

// login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "email is not registered", success: false });
    }
    // Comparing the password with hashed password .
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    return res
      .status(200)
      .json({ message: "Login successful", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in login callback", success: false, error });
  }
}


module.exports = { createUser, getAllUsers, loginUser };
