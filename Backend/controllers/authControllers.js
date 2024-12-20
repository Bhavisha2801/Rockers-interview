const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      photo: req.file.path,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
