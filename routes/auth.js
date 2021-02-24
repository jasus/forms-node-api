const { Router } = require("express");
const { check } = require("express-validator");

const { login, register } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const {
  existUserByEmail,
  existUserByUsername,
} = require("../helpers/db-validators");

const router = Router();

router.post("/login", login);
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "This is not a valid email").isEmail(),
    check("username").custom(existUserByUsername),
    check("email").custom(existUserByEmail),
    validateFields,
  ],
  register
);

module.exports = router;
