import { useMemo } from "react";
import { IPost } from "../models/IPost";
export const useSortedPosts = (
	posts: IPost[],
	sort: Extract<keyof IPost, "title" | "body"> | "",
) => {
	const sortedPosts = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [posts, sort]);
	return sortedPosts;
};

export const usePosts = (
	posts: IPost[],
	sort: Extract<keyof IPost, "title" | "body"> | "",
	query: string | "",
) => {
	const sortedPosts = useSortedPosts(posts, sort);

	const sortedAndSearchPosts = useMemo(() => {
		if (!query) {
			return sortedPosts;
		}

		return sortedPosts.filter((post) =>
			post.title.toLowerCase().includes(query.toLowerCase()),
		);
	}, [query, sortedPosts]);

	return sortedAndSearchPosts;
};
