import axios from "axios";
import { $api } from "../API/axios";
import { ICommentCreate } from "../models/IComment";

export default class CommentService {
	static async getAll(postId: number) {
		const response = await $api.get(`/api/comments/all/${postId}`);
		return response;
	}
	static async create(comment: ICommentCreate) {
		try {
			const response = await $api.post("/api/comments/create", comment);
			return response;
		} catch (e) {
			console.log("create comment error", e);
		}
	}
}
