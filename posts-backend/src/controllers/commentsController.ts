import { Request, Response, NextFunction } from "express";
import { Comment } from "../generated/prisma/client/client";
import prisma from "../prisma/client";
import ApiError from "../error/ApiError";

class CommentController {
	async getComments(req: Request, res: Response, next: NextFunction) {
		try {
			const postId = Number(req.params.postId);
			if (!postId) {
				return next(ApiError.badRequest("postId is required"));
			}

			const allComments = await prisma.comment.findMany({
				where: { postId: postId },
				include: { user: { select: { email: true } } },
			});
			return res.json(allComments);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { body, userId, postId } = req.body;
			const newComment = await prisma.comment.create({
				data: { body, userId, postId },
			});
			return res.json(newComment);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}
}

export default new CommentController();
