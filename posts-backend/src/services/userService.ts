import prisma from "../prisma/client";
const bcrypt = require("bcrypt");
import uuid from "uuid";
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDot";
import ApiError from "../error/ApiError";

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
		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${activationLink}`,
		);
		const userDto = new UserDto(newUser);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}

	async activate(activationLink: string | undefined) {
		const user = await prisma.user.findFirst({ where: { activationLink } });
		if (!user) {
			const message: string = "Activation link is missing";
			throw ApiError.badRequest(message);
		}
		await prisma.user.update({
			where: { id: user.id },
			data: { isActivated: true },
		});
	}

	async login(email: string, password: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw ApiError.badRequest("user not found");
		const isPasswordEquals = await bcrypt.compare(password, user.password);
		if (!isPasswordEquals) throw ApiError.badRequest("wrong password");

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) throw ApiError.unauthorisedError();
		const userData = await tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.unauthorisedError();
		}
		const user = await prisma.user.findFirst({
			where: {
				id: userData.id,
			},
		});
		if (!user) throw ApiError.unauthorisedError();
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}
}

export default module.exports = new userService();
