import { AIService } from "./../services/ai.service";
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";
import ApiError from "../error/ApiError";

// везде где нужны доп данные create getall getone
const postPopulateOptions = {
	include: {
		user: { select: { email: true } },
		tags: { select: { tag: { select: { body: true } } } },
		_count: { select: { comments: true } },
	},
};

const formatPost = (post: any) => {
	if (!post) return null;
	return {
		...post,
		tags: post.tags ? post.tags.map((t: any) => t.tag.body) : [],
	};
};
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

				...postPopulateOptions,
			});
			return res.json(formatPost(newPost));
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
				...postPopulateOptions,
			});
			return res.json(formatPost(updatedPost));
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			await prisma.posts.delete({ where: { id: id } });
			// 204 статус - нет контента,возращать нечего. end завершает запрос и гарантирует что улетят только заголовки
			return res.status(204).end();
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
				orderBy: { createdAt: "desc" },
				take: currentLimit,
				skip: offset,
				...postPopulateOptions,
			});
			const totalPosts = await prisma.posts.count();
			const formattedPosts = allPosts.map(formatPost);
			return res.json({ posts: formattedPosts, totalPosts });
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const post = await prisma.posts.findUnique({
				where: { id: id },
				...postPopulateOptions,
			});

			if (!post) {
				return res.status(404).json({ message: "пост не найден" });
			}

			return res.json(formatPost(post));
		} catch (error) {
			next(error);
		}
	}
}

export default new PostsController();
