const express = require("express");
const router = express.Router();
const config = require("config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");

// @desc  REGISTER A USER

// @route POST api/users
// @access  Public
router.post(
  "/",
  [
    check("name", "Enter a Name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role, connections } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exists. Please login." });
      }

      user = new User({
        name,
        email,
        password,
        role,
        connections
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc UPDATE USER CONNECTIONS
// @route PUT api/users/:id
// access private

router.put("/:id", auth, async (req, res) => {

  // Build contact object
  try {
    // Find requesting userID as the parameter and
    // Connection id in the body
    // make a list of IDs
    let user = await User.findById(req.params.id).select('-password');
    let newConnection = await User.findById(req.body.connection).select('-password');
    let connections = user.connections.map(conn => conn.id)
    let userConns = newConnection.connections.map(uConn => uConn._id)

    //simple validation to avoid duplicates
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (!newConnection) return res.status(404).json({msg:"Connection not found"});
    if (connections.includes(newConnection.id) || userConns.includes(user._id)) 
    return res.status(404).json({msg: "Connection exists"});

    //Build objects for user connections and connection connections


    const userFields = {}
    let conn = { name: newConnection.name, id: newConnection._id, email:newConnection.email}
    if (newConnection) userFields.connections = [...user.connections,conn]

    const connFields = {}
    let userConn = { name: user.name, id: user._id, email:user.email}
    connFields.connections = [...newConnection.connections,userConn]

    // add them to their counter parts connections
    newConnection = await User.findByIdAndUpdate(
      newConnection.id,
      { $set: connFields },
      { new: true }
    );
    
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
  




// @desc  GET ALL CONTRACTORS

// @route GET api/users/contractors
// @access  public

router.get("/contractors", async (req, res) => {
  try {
    const data = await User.find({ role: "contractor" }).sort({ date: -1 });
    res.json(data)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
