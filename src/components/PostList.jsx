import React from "react";
import { motion, AnimatePresence } from "motion/react";
import PostItem from "./PostItem";

function PostList({ posts, title, remove, className }) {
	if (!posts.length)
		return (
			<h1 style={{ textAlign: "center", marginBottom: "20px" }}>No posts found</h1>
		);

	return (
		<div className={className}>
			<AnimatePresence>
				<h1 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h1>
				{posts.map((post, index) => (
					<PostItem number={index + 1} key={post.id} post={post} remove={remove} />
				))}
			</AnimatePresence>
		</div>
	);
}

export default PostList;
