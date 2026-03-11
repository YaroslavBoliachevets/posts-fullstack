import axios from "axios";
import { $api } from "../API/axios";

export default class PostService {
	static async getAll(limit = 10, page = 1) {
		const response = await $api.get("/api/posts/all", {
			params: { limit, page },
		});
		return response;
	}

	static async getById(id) {
		// const responce = await axios.get(
		// 	"https://jsonplaceholder.typicode.com/posts/" + id,
		// );
		const response = $api.get(`/api/posts/${id}`);
		return response;
	}
	static async getCommentsById(id) {
		const responce = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${id}/comments`,
		);
		console.log(responce);
		return responce;
	}

	static async createNewPost(post) {
		try {
			const response = await $api.post("/api/posts/create", post);
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
}
