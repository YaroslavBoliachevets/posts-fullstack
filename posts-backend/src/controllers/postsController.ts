import { AIService } from "./../services/ai.service";
import { Request, Response, NextFunction } from "express";
import { Posts } from "../generated/prisma/client/client";
import prisma from "../prisma/client";
import ApiError from "../error/ApiError";
import { toLowerCase } from "zod";
import { body } from "express-validator";

class PostsController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, body, userId } = req.body;
			const aiResult = await AIService.AnalyzePostContent(title, body);
			const tags = aiResult?.tags || [];
			const newPost = await prisma.posts.create({
				data: {
					title,
					body,
					user: { connect: { id: userId } },
					// userId,
					tags: {
						create: tags.map((tagBody: string) => ({
							tag: {
								connectOrCreate: {
									where: { body: tagBody.toLowerCase() },
									create: { body: tagBody.toLowerCase() },
								},
							},
						})),
					},
				},
				include: {
					user: { select: { email: true } },
					tags: { include: { tag: true } },
				},
			});
			const formattedPost = {
				...newPost,
				tags: newPost.tags.map((tag) => tag.tag.body),
			};
			return res.json(formattedPost);
		} catch (e: any) {
			console.error("!!! ОШИБКА СОЗДАНИЯ ПОСТА С ТЕГАМИ:", e);
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
					tags: { select: { tag: { select: { body: true } } } },
					_count: {
						select: { comments: true },
					},
				},
			});
			const totalPosts = await prisma.posts.count();

			const formattedPosts = allPosts.map((post) => ({
				...post,
				tags: post.tags.map((t) => t.tag.body),
			}));

			return res.json({ posts: formattedPosts, totalPosts });
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getOne(req: Request, res: Response) {
		const id = Number(req.params.id);
		const post = await prisma.posts.findUnique({
			where: { id: id },
			include: {
				user: {
					select: { email: true },
				},
			},
		});

		return res.json(post);
	}
}

export default new PostsController();
