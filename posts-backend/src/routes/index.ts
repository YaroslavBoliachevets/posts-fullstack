const Router = require("express");

const router = new Router();
const userRouter = require("./userRouter");
const postsRouter = require("./postsRouter");
const commentsRouter = require("./commentsRouter");
router.use("/user", userRouter);
router.use("/posts", postsRouter);

// router.use("/post");
// router.use("/comments");

module.exports = router;
