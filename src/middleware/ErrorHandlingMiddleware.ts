import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
// низя использовать require в ts

export default function ErrorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message });
	}
	return res.status(500).json({ message: "Unknown server error" });
}
