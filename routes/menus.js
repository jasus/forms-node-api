const { Router } = require("express");

const { getMenus } = require("../controllers/menus");

const router = Router();

router.get("/", getMenus);

module.exports = router;
