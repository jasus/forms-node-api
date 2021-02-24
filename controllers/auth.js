const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.User;

const login = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({
    where: { email },
  })
    .then((user) => {
      if (user == null) {
        return res.status(400).json({
          msg: "Invalid email or password",
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          user,
        },
        process.env.SEED,
        { expiresIn: process.env.TOKEN_EXPIRY }
      );

      res.json({
        user,
        token,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error when login an user",
        },
      });
    });
};

const register = async (req, res) => {
  const { username, name, email, password, age, gender } = req.body;

  await User.create({
    username,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    age,
    gender,
  })
    .then((user) => {
      const token = jwt.sign(
        {
          user,
        },
        process.env.SEED,
        { expiresIn: process.env.TOKEN_EXPIRY }
      );

      res.json({
        user,
        token,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error when register an user",
        },
      });
    });
};

module.exports = {
  login,
  register,
};
