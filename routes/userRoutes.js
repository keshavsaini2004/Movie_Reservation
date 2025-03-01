const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {jwtAuthMiddleware, generateToken} = require("./../jwt");
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try{
     const data = req.body;

     const insertJson ={
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
     }
     
    const newUser = new User(insertJson);
    const response = await newUser.save();

    const payload = {
      user_id: response._id,
      email: response.email,   
    };
    const token = generateToken(payload);

    res.status(200).json({
      success:true,
      status: 200,
      message: "Data saved successfully",
      data: response,
      token: token
    });

  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: "Invalid Username and Password" });
    }
    const payload = {
      user_id: user._id,
      email: user.email
    };
    const token = generateToken(payload);
    res.json({
      success: true,
      token: token,
      message: "login success",
      user_type: user.user_type ? user.user_type : 'user'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;