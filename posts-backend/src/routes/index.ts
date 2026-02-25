const Router = require("express");
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = new Router();
const userRouter = require("./userRouter");
const postsRouter = require("./postsRouter");
const commentsRouter = require("./commentsRouter");
router.use("/user", userRouter);
router.use("/posts", AuthMiddleware, postsRouter);

// router.use("/post");
// router.use("/comments");

module.exports = router;
