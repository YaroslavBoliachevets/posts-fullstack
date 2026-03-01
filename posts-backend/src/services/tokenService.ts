// payload данные которые мы вкладываем внутрь токена, обьект который будет зашифрован
//  refreshToken сохраняем в куках чтобы можно было отозвать,разлогинить или заблокировать, также обновлять accessToken , accessToken  клиент хранит у себя в памяти

const jwt = require("jsonwebtoken");
import prisma from "../prisma/client";

class tokenService {
	generateTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "30m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	validateAccessToken(token: string) {
		try {
			// проверяем что токен подписан именно этим секретом, не подделан, не изменен
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await prisma.token.findUnique({
			where: { userId },
		});
		if (tokenData) {
			return prisma.token.update({ where: { userId }, data: { refreshToken } });
		}

		return prisma.token.create({ data: { userId, refreshToken } });
	}

	async removeToken(token: string) {
		const tokenData = await prisma.token.findUnique({
			where: {
				refreshToken: token,
			},
		});
		if (!tokenData) return null;
		return await prisma.token.delete({
			where: { refreshToken: token },
		});
	}

	async findToken(token: string) {
		const findedToken = await prisma.token.findUnique({
			where: { refreshToken: token },
		});
		if (!findedToken) return null;
		return findedToken;
	}
}

export default new tokenService();
