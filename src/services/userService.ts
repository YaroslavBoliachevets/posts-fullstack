import prisma from "../prisma/client";
const bcrypt = require("bcrypt");
import uuid from "uuid";
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDot";
import ApiError from "../error/ApiError";
import { NextFunction } from "express";

class userService {
	async registration(email: string, password: string) {
		const candidate = await prisma.user.findUnique({ where: { email: email } });

		if (candidate) {
			const message: string = "This email address already exists";
			throw ApiError.internal(message);
		}
		const hashedPassword = await bcrypt.hash(password, 5);
		const activationLink = await uuid.v4();
		const newUser = await prisma.user.create({
			data: { email, password: hashedPassword, activationLink },
		});
		await mailService.sendActivationMail(email, activationLink);
		const userDto = new UserDto(newUser);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}
}

export default module.exports = new userService();
