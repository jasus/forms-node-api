const models = require("../models");
const User = models.User;

const existUserByUsername = async (username) => {
  await User.findOne({ where: { username } }).then((user) => {
    if (user !== null) {
      throw new Error(`Username ${username} already exist`);
    }
  });
};

const existUserByEmail = async (email) => {
  if (email !== undefined) {
    await User.findOne({ where: { email } }).then((user) => {
      if (user !== null) {
        throw new Error(`Email ${email} already exist`);
      }
    });
  }
};

module.exports = {
  existUserByUsername,
  existUserByEmail,
};
