import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import userService from "../services/userService";
const { validationResult } = require("express-validator");

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest("validation error"));
			}

			const { email, password } = req.body;
			const userData = await userService.registration(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e: any) {
			return next(ApiError.badRequest(e));
		}
	}

	async login(req: Request, res: Response) {}
	async logout(req: Request, res: Response) {}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link as string;
			await userService.activate(activationLink);
			const clientUrl = process.env.CLIENT_URL;
			if (clientUrl) {
				return res.redirect(clientUrl);
			}
		} catch (e: any) {
			return next(ApiError.badRequest(e));
		}
	}
}

export default new UserController();
