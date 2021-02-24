const bcrypt = require("bcrypt");

const models = require("../models");
const Menu = models.Menu;

const getMenus = async (req, res) => {
  await Menu.findAll({
    where: { subMenuId: null },
    include: {
      model: Menu,
      as: "subMenu",
      required: false,
      include: {
        all: true,
        nested: true,
      },
    },
  })
    .then((menus) => {
      res.json({
        menus,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error when get menus",
        },
      });
    });
};

module.exports = {
  getMenus,
};
