const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken');
const { response } = require("express");


const test = (req, res) => {
  res.json("hello world");
};

//Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if name was entered
    if (!name) {
      return res.json({
        error: "name not entered",
      });
    }
    //Check if password is well-formed
    if (!password || password.length < 6) {
      return res.json({
        error: "password must be at least 6 characters",
      });
    }

    //Check if email was entered
    const exist = await User.findOne({ email });
    console.log("User object:", exist);
    if (exist) {
      return res.json({
        error: "email is already",
      });
    }

    const hashedPassword = await hashPassword(password);
    //create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

function sendResponse(res, user, token) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'none', // Set the SameSite attribute
    secure: true, // Set the Secure attribute when using SameSite=None
    partitioned: true, // Set the Partitioned attribute
  });
  res.json(user);
} 

//Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    console.log("User object:", user);
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    // console.log("User object:", user);

    const match = await comparePassword(password, user.password);
    if (match) {
      // Set the token expiration time to 2 hours (7200 seconds)
      const expiresIn = '2h';

      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn },
        (err, token) => {
          if (err) {
            // Handle the error
            console.error('Error signing JWT:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          // Call the sendResponse function to set the cookie and send the response
          sendResponse(res, user, token);
        }
      );
    }
    if (!match) {
      res.json({
        error: "password don't match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};


const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        // If the token is invalid or expired, clear the cookie
        res.clearCookie('token');
        res.json(null);
      } else {
        res.json(user);
      }
    });
  } else {
    res.json(null);
  }
};

const logoutUser = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      partitioned: true,
    });
  
    // Send a success response
    res.json({ message: 'Logout successful' });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser
};
