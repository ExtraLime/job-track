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

// @desc  GET ALL CONTRACTORS

// @route GET api/users
// @access  Private

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
