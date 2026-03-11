import { Router } from "express";
import postsController from "../controllers/postsController";
const router = Router();

router.post("/create", postsController.create);
router.delete("/:id", postsController.delete);
router.put("/:id", postsController.update);
router.get("/all", postsController.getAll);
router.get("/:id", postsController.getOne);

module.exports = router;
