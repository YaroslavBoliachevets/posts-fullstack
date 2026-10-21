import { ICommentCreate } from "./../models/IComment";
import { $api } from "../API/axios";
import { AxiosResponse } from "axios";

export default class CommentService {
	static async getAll(postId: number): Promise<AxiosResponse<ICommentCreate[]>> {
		try {
			const response = await $api.get<ICommentCreate[]>(
				`/api/comments/all/${postId}`,
			);
			return response;
		} catch (error) {
			console.log("comServ getAll error", error);
			throw error;
		}
	}

	static async create(
		comment: ICommentCreate,
	): Promise<AxiosResponse<ICommentCreate>> {
		try {
			const response = await $api.post<ICommentCreate>(
				"/api/comments/create",
				comment,
			);
			return response;
		} catch (error) {
			console.log("create comment error", error);
			throw error;
		}
	}

	static async delete(id: number): Promise<AxiosResponse<ICommentCreate>> {
		try {
			const response = await $api.delete<ICommentCreate>(`/api/comments/${id}`);
			return response;
		} catch (error) {
			console.log("comServ del error", error);
			throw error;
		}
	}

	static async update(
		comment: ICommentCreate,
	): Promise<AxiosResponse<ICommentCreate>> {
		try {
			const response = await $api.put<ICommentCreate>(
				`/api/comments/${comment.id}`,
				comment,
			);
			return response;
		} catch (error) {
			console.log("comServ upd error", error);
			throw error;
		}
	}
}
