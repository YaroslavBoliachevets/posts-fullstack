import { Router } from "express";
import commentController from "../controllers/commentsController";
const router = Router();

router.post("/create", commentController.create);
router.get("/all/:postId", commentController.getComments);

module.exports = router;
