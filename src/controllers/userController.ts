import { Request, Response } from "express";

class UserController {
	async registration(req: Request, res: Response) {}
	async login(req: Request, res: Response) {}
	async check(req: Request, res: Response) {
		const { id } = req.query;
		res.status(200).json(id);
		res.status(200).json({ message: "working" });
	}
}

export default new UserController();
