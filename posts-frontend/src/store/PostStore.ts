import { makeAutoObservable, runInAction } from "mobx";
import { IFilter } from "../pages/Posts/Posts";
import { IPost } from "../models/IPost";
import PostService from "../services/PostService";
import { getPagesCount } from "../utils/pages";

class PostStore {
	posts: IPost[] = [];
	filter: IFilter = { sort: "", query: "" };
	modal: boolean = false;
	totalPages: number = 0;
	limit: number = 10;
	page: number = 1;
	isLoading: boolean = false;
	error: string = "";

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	setFilter(filter: IFilter) {
		this.filter = filter;
	}

	setLimit(limit: number) {
		this.limit = limit;
		this.page = 1;
		this.posts = [];
	}

	setPage(page: number) {
		this.page = page;
	}

	setPosts(posts: IPost[]) {
		this.posts = posts;
	}

	setModal(visible: boolean) {
		this.modal = visible;
	}

	nextPage() {
		if (this.page < this.totalPages) {
			this.page += 1;
		}
	}

	fetchPosts = async () => {
		this.isLoading = true;
		this.error = "";
		try {
			const response = await PostService.getAll(this.limit, this.page);
			runInAction(() => {
				const newPosts = response.data.posts;

				if (this.page === 1) {
					this.posts = newPosts;
				} else {
					this.posts = [...this.posts, ...newPosts];
				}
				const totalPosts = response.data.totalPosts;
				this.totalPages = getPagesCount(totalPosts, this.limit);
			});
		} catch (e) {
			runInAction(() => {
				this.error = e instanceof Error ? e.message : String(e);
			});
		} finally {
			runInAction(() => {
				this.isLoading = false;
			});
		}
	};

	createPost = async (post: Omit<IPost, "id" | "createdAt" | "user">) => {
		try {
			const response = await PostService.createNewPost(post);
			runInAction(() => {
				this.posts = [response.data, ...this.posts];
				this.modal = false;
			});
		} catch (e) {
			console.error("error with creating a new post", e);
		}
	};
}

export const postStore = new PostStore();
