const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator"); //validation
const bcrypt = require("bcryptjs"); //password hasing support
const token = require("jsonwebtoken"); //jwt

const JWT_SECRET = "heavyDriv@r";
//Create a User(Signup) POST '/api/auth/createUser' no authentication needed
router.post(
  "/createUser",
  [
    body("name", "Enter a name with minimum length of 3").isLength({ min: 3 }),
    body("email", "Enter a valid email ID").isEmail(),
    body("password", "Create a password with minimum length of 5").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    // console.log(req.body);//on terminal
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success:false,
          error:
            "Sorry. A user with same email already exist. Try new or else try logging in."
        });
      }

      var salt = bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hash(req.body.password, salt); //Hashing with added salt
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      });
      user.save();
      //create token payload with self data.(generally as JavaScript object)
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = token.sign(data, JWT_SECRET);
      let success=true;
      res.json({ success,authToken });
    } catch (error) {
      res.status(500).json({ success:false,err: "Some error occured. Try again later." });
    }
  }
);
//Autrhenticate User POST '/api/auth/login' no authentication needed
router.post(
  "/login",
  [
    body("email", "Enter a valid email ID").isEmail(),
    body("password", "Create a password with minimum length of 6").exists()
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success:false,
          error: "Sorry. Try to login with correct credentials.(email)"
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success:false,error: "Sorry. Try again with correct credentials.(pwd)" });
      }

      //create token payload with self data.(generally as JavaScript object)
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = token.sign(data, JWT_SECRET);
      let success=true;
      res.json({ success,authToken });
    } catch (error) {
      res.status(500).json({ success:false,err: "Internal error. Try again later." });
      console.log(error.message);
    }
  }
);

//Get LoggedIn user details POST '/api/auth/getUser' login authentication needed
router.post(
  "/getUser",
  fetchUser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).json({ success:false,err: "Internal error. Try again later." });
      console.log(error.message);
    }
  }
);

module.exports = router;
