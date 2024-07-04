const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sivasish48:HVL2qGFrtjiNTEum@fusion.wubagih.mongodb.net/")


const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
    const{username, password} = req.body;

    try{
    const userDoc = await User.create({username,password:bcrypt.hashSync(password,salt)});
      res.json(userDoc);
    }catch(err){
      console.log(err);
      res.status(400).json({message:"User already exists",err});
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});