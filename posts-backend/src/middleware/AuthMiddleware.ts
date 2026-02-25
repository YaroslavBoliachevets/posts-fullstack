import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import tokenService from "../services/tokenService";

export default function AuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.unauthorisedError());
		}
		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return next(ApiError.unauthorisedError());
		}
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.unauthorisedError());
		}
		req.user = userData;
		next();
	} catch (error) {
		return next(ApiError.unauthorisedError());
	}
}
