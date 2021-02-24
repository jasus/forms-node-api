const { Router } = require("express");
const { check } = require("express-validator");

const { updateUser } = require("../controllers/users");

const { existUserByEmail } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.put(
  "/:id",
  [check("email").custom(existUserByEmail), validateFields],
  updateUser
);

module.exports = router;
