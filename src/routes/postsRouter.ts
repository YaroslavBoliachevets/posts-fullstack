import { Router } from "express";
const router = Router();

router.post("/registration", (req, res) => {
	res.send("registration");
});
router.get("/auth", (req, res) => {
	res.send("auth");
});

module.exports = router;
