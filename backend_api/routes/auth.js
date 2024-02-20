const express = require("express");
const router = express.Router();
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var fetchuser=require('./../middleware/fectchuser')
const JWT_SECRET='isAnkitIsGoodboy'
//Route 1:create a user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), // validator
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // error handler
    }
    // check the Email is already esist or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .json({ error: "Email already exist", message: errors.message });
      const salt=await bcrypt.genSalt(10)
      const secPwd= await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        // usder
        name: req.body.name,
        password: secPwd,
        email: req.body.email,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      res.json({authToken:authToken,Status: "Success", UserCreated: req.body.name });
    } catch (w) {
      console.log(w);
      res.status(500).json({ error: "some err occured" });
    }
  }
);



// Route 2: Authenticate a user using : POST "/api/auth/login".  login required
router.post(
  "/login",
  [
    body("email",'Enter a valid email').isEmail(), 
    body("password",'Password cant be blank').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // error handler
    }
    const {email, password}=req.body;
    try{

      let user= await User.findOne({email})
      if(!user){

        success=false;
      
      return res.status(401).json({ error: "Login Failed,Email. Try Again", message: errors.message });}
      const passwordCompare= await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        success=false;
      return res
      .status(401)
      .json({success, error: "Login Failed,pwd Try Again", message: errors.message })
    }
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      let success=true;
      res.json({success,authToken:authToken});

    }
    catch (w) {
      let success=false;
      console.log(w);
      res.status(500).json({success, error: "Internal server error" });
    }
  }
)






// Route 3: get loggedin  User details : POST "/api/auth/getuser".  login required
router.post(
  "/getuser",fetchuser, async (req, res) => {
    
   
try{
  var userId=req.user.id;
  const user= await User.findById(userId).select("-password")
  res.send(user)

}
catch(w){
  console.log(w);
      res.status(500).json({ error: "Internal server error 2" });

}}
)


module.exports = router;