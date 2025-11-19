import React from "react";
import { motion, AnimatePresence } from "motion/react";
import PostItem from "./PostItem";

function PostList({ posts, title, remove }) {
	if (!posts.length)
		return <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>;

	return (
		<AnimatePresence>
			<h1 style={{ textAlign: "center" }}>{title}</h1>
			{posts.map((post, index) => (
				<PostItem
					number={index + 1}
					key={post.id}
					post={post}
					remove={remove}
				/>
			))}
		</AnimatePresence>
	);
}

export default PostList;
