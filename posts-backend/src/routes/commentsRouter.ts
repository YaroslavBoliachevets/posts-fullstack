import { Router } from "express";
import commentController from "../controllers/commentsController";
const router = Router();

router.post("/create", commentController.create);
router.get("/all/:postId", commentController.getComments);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
