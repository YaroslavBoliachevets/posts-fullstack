// require -для глобального обьявления, нам нужно локально по этому импорт
import { Router } from "express";
const router = Router();
// const userController = require("../controllers/userController");
import userController from "../controllers/userController";

router.get("/auth", userController.check);
router.post("/registration", userController.registration);
router.post("/login", userController.login);

module.exports = router;
