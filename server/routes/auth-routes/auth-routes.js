const express = require("express");
const { authControllers } = require("../../controllers");

const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/signin", authControllers.signin);
router.post("/googleAuth", authControllers.googleAuth);
router.post("/signout", authControllers.signout);

module.exports = router;
