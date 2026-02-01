// require -для глобального обьявления, нам нужно локально по этому импорт
import { Router } from "express";
const router = Router();
// const userController = require("../controllers/userController");
import userController from "../controllers/userController";

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.check);
// router.get("/refresh");
// router.get("/users");

module.exports = router;
