const bcrypt = require("bcrypt");

const models = require("../models");
const User = models.User;

const updateUser = async (req, res) => {
  const id = req.params.id;

  const { email, password, name, age, gender } = req.body;

  const userFound = await User.findByPk(id)
    .then((user) => {
      if (user == null) {
        return res.status(400).json({
          msg: "Invalid email or password",
        });
      }

      return user;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error when update an user",
        },
      });
    });

  if (email !== undefined) {
    userFound.email = email;
  }

  if (password !== undefined) {
    userFound.password = bcrypt.hashSync(password, 10);
  }

  if (name !== undefined) {
    userFound.name = name;
  }
  if (age !== undefined) {
    userFound.age = parseInt(age);
  }
  if (gender !== undefined) {
    userFound.gender = gender;
  }

  const userSaved = await userFound.save();

  res.json({
    userSaved,
  });
};

module.exports = {
  updateUser,
};
