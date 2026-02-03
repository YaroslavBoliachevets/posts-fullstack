// require -для глобального обьявления, нам нужно локально по этому импорт
import { Router } from "express";
const router = Router();
import userController from "../controllers/userController";
const { body } = require("express-validator");

router.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 32 }),
	userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
// router.get("/refresh");
// router.get("/users");

module.exports = router;
