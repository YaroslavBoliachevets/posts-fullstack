import { Request, Response, NextFunction } from "express";
import { Posts } from "../generated/prisma/client/client";
import prisma from "../prisma/client";
import ApiError from "../error/ApiError";

class PostsController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, body, userId } = req.body;
			const newPost = await prisma.posts.create({
				data: { title, body, userId },
				include: { user: { select: { email: true } } },
			});
			return res.json(newPost);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const { title, body } = req.body;

			const updatedPost = await prisma.posts.update({
				where: { id },
				data: {
					title,
					body,
				},
			});
			return res.json(updatedPost);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const deletedPost = await prisma.posts.delete({ where: { id: id } });
			return res.json(deletedPost);
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { limit, page } = req.query;
			const currentPage = Number(page) || 1;
			const currentLimit = Number(limit) || 10;
			let offset = (currentPage - 1) * currentLimit;
			const allPosts = await prisma.posts.findMany({
				orderBy: { id: "asc" },
				take: currentLimit,
				skip: offset,
				include: {
					user: {
						select: {
							email: true,
						},
					},
					_count: {
						select: { comments: true },
					},
				},
			});
			const totalPosts = await prisma.posts.count();
			return res.json({ posts: allPosts, totalPosts });
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getOne(req: Request, res: Response) {
		const id = Number(req.params.id);
		const post = await prisma.posts.findUnique({ where: { id: id } });
		return res.json(post);
	}
}

export default new PostsController();
