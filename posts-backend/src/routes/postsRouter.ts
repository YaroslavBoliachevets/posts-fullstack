import { Router } from "express";
import postsController from "../controllers/postsController";
import AuthMiddleware from "../middleware/AuthMiddleware";
const router = Router();

router.post("/create", AuthMiddleware, postsController.create);
router.delete("/:id", AuthMiddleware, postsController.delete);
router.put("/:id", AuthMiddleware, postsController.update);
router.get("/all", postsController.getAll);
router.get("/:id", postsController.getOne);

module.exports = router;
