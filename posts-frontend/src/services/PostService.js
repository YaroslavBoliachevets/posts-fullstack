import axios from "axios";
import { $api } from "../API/axios";

export default class PostService {
	static async getAll(limit = 10, page = 1) {
		// const response = await $api.get("/api/posts/all", {
		// 	params: { limit, page },
		// });
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/posts/all`,
			{ params: { limit, page } },
		);
		return response;
	}

	static async getById(id) {
		const response = $api.get(`/api/posts/${id}`);
		return response;
	}

	static async createNewPost(post) {
		try {
			const response = await $api.post("/api/posts/create", post);
			return response;
		} catch (error) {
			console.log("create post error");
		}
	}

	static async deletePost(id) {
		try {
			const response = await $api.delete(`/api/posts/${id}`);
		} catch (error) {
			console.log("delete post error");
		}
	}

	static async updatePost(post) {
		try {
			const response = await $api.put(`/api/posts/${post.id}`, post);
			return response;
		} catch (error) {
			console.log("update post error", error.message);
		}
	}
}
