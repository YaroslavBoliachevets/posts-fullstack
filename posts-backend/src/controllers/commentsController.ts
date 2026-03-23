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
				include: { user: { select: { email: true } } },
			});
			return res.json(newComment);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async updateComment(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const { body } = req.body;
			const updatedComment = await prisma.comment.update({
				where: { id },
				data: {
					body,
				},
			});
			return res.json(updatedComment);
		} catch (e: any) {
			console.log("update comment error", next(ApiError.badRequest(e.message)));
		}
	}

	async deleteComment(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const deletedPost = await prisma.comment.delete({ where: { id: id } });
			return res.json(deletedPost);
		} catch (e: any) {
			console.log("delete comment error", next(ApiError.badRequest(e.message)));
		}
	}
}

export default new CommentController();
