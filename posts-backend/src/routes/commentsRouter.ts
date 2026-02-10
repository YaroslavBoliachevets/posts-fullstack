import { Router } from "express";
const router = Router();

router.get("/auth", (req, res) => {
	res.send("auth");
});

module.exports = router;
