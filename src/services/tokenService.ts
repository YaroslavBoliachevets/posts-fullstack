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
	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await prisma.token.findUnique({
			where: { userId },
		});
		if (tokenData) {
			return prisma.token.update({ where: { userId }, data: { refreshToken } });
		}

		return prisma.token.create({ data: { userId, refreshToken } });
	}
}

export default new tokenService();
