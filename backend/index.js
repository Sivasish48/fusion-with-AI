const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

// Apply CORS middleware with comprehensive configuration
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization"
}));

// Handle preflight requests
app.options('*', cors());

mongoose.connect("mongodb+srv://suvam48:dVeNZd.QV8vgng7@fusion.wubagih.mongodb.net/");
const secret = "secrettt";
const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt) });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "User already exists", err });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const checkPassword = bcrypt.compareSync(password, userDoc.password);
  if (checkPassword) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json("ok");
    });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
