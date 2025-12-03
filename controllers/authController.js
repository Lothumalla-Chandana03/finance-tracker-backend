// importing the user model so we can save and read users from mongodb
const User = require("../models/User");

// bcrypt helps us to convert (hash) the password into unreadable form
const bcrypt = require("bcryptjs");

// jsonwebtoken helps us create login tokens for authentication
const jwt = require("jsonwebtoken");

// SIGNUP CONTROLLER

exports.signup = async (req, res) => {
  try {
    // taking name, email, password from users request body
    const { name, email, password } = req.body;

    // checking if the user already exists in the database using email
    const userExists = await User.findOne({ email });

    // if email already registered, show error
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // hashing the password (turning it into random encrypted text)
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user object to save in database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // saving the new user to mongodb database
    await newUser.save();

    // sending success response
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    // if anything goes wrong, send server error
    res.status(500).json({ error: err.message });
  }
};


//LOGIN CONTROLLER

exports.login = async (req, res) => {
  try {
    // taking email & password user entered in login form
    const { email, password } = req.body;

    // checking if this email exists in the database
    const user = await User.findOne({ email });

    // if no user found → show message
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // comparing entered password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);

    // if password does not match → show error
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // creating a login token for the user (valid for 7 days)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // sending success response with token and user details
    res.json({
      message: "Login successful",
      token, // frontend will save this token for authentication
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    // handling server errors
    res.status(500).json({ error: err.message });
  }
};
