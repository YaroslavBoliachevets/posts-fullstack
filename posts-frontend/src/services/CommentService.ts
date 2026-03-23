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
	static async delete(id: number) {
		try {
			const response = await $api.delete(`/api/comments/${id}`);
			return response;
		} catch (error: any) {
			console.log("comServ del error", error.message);
		}
	}

	static async update(comment: ICommentCreate) {
		try {
			const response = await $api.put(`/api/comments/${comment.id}`, comment);
			return response;
		} catch (error: any) {
			console.log("comServ upd error", error.message);
		}
	}
}
