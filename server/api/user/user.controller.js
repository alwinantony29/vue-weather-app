const router = require("express").Router();
const userService = require("./user.service");

router.get("/", (req, res) => res.send("user controller"));
router.post("/signup", userService.handleSignup);
router.post("/signin", userService.handleSignIn);

module.exports = router;
