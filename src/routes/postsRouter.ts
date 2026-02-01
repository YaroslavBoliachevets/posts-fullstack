import { Router } from "express";
import postsController from "../controllers/postsСontroller";
const router = Router();

router.post("/registration", postsController.create);
router.delete("/:id", postsController.delete);
router.put("/:id", postsController.update);
router.get("/all", postsController.getAll);
router.get("/:id", postsController.getOne);

module.exports = router;
