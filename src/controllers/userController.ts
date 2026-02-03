import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import userService from "../services/userService";
import prisma from "../prisma/client";
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
import UserDto from "../dtos/userDot";
import tokenService from "../services/tokenService";

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

	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password, activationLink } = req.body;
		const user = await prisma.user.findUnique({
			where: { email: email },
		});
		if (!user) {
			return next(ApiError.badRequest("Email not found"));
		}
		const isPassowrdEquals = await bcrypt.compare(password, user.password);
		if (!isPassowrdEquals) {
			return next(ApiError.badRequest("Wrong password"));
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		return res.json({ ...tokens, user: userDto });
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			res.json(token);
		} catch (error) {}
	}

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
