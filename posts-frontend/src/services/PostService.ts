import { $api } from "../API/axios";
import { AxiosResponse } from "axios";
import { IPost } from "../models/IPost";
import { PostResponse } from "../models/response/PostsResponse";

export default class PostService {
	static async getAll(
		limit = 10,
		page = 1,
	): Promise<AxiosResponse<PostResponse>> {
		return $api.get<PostResponse>("/api/posts/all", { params: { limit, page } });
	}

	static async getById(id: number): Promise<AxiosResponse<IPost>> {
		return $api.get<IPost>(`/api/posts/${id}`);
	}

	static async createNewPost(
		post: Omit<IPost, "id" | "createdAt" | "user" | "userId">,
	): Promise<AxiosResponse<IPost>> {
		return $api.post<IPost>("/api/posts/create", post);
	}

	static async deletePost(id: number): Promise<AxiosResponse<void>> {
		return $api.delete<void>(`/api/posts/${id}`);
	}

	static async updatePost(
		post: Omit<IPost, "user" | "createdAt">,
	): Promise<AxiosResponse<IPost>> {
		return $api.put<IPost>(`/api/posts/${post.id}`, post);
	}
}
