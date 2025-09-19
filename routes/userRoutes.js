const express = require("express");
const {
  getAllUsers,
  createUser,
  loginUser,
} = require("../controllers/userController");
// router object to perform routing :
const router = express.Router();

// getting all users || GET
router.get("/get-allUsers", getAllUsers);

// craeting new user || POST
router.post("/register", createUser);

// Loggin user || POST
router.post("/login", loginUser);

module.exports = router;
