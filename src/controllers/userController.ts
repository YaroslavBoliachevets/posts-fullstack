import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import userService from "../services/userService";

class UserController {
	async registration(req: Request, res: Response) {
		const { email, password } = req.body;
		const userData = await userService.registration(email, password);
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.json(userData);
	}

	async login(req: Request, res: Response) {}
	async logout(req: Request, res: Response) {}
	async check(req: Request, res: Response, next: NextFunction) {
		const { id } = req.query;

		res.status(200).json(id);
		// res.status(200).json({ message: "working" });
	}
}

export default new UserController();
