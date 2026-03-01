import React, { useState } from "react";
import styles from "./PostForm.module.css";

import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

function PostForm({ create }) {
	const [post, setPost] = useState({ title: "", body: "" });

	const addNewPosts = (e) => {
		e.preventDefault();
		create({ ...post, id: Date.now() });
		setPost({ title: "", body: "" });
	};

	return (
		<form className={styles.form}>
			<Input
				onChange={(e) => setPost({ ...post, title: e.target.value })}
				value={post.title}
				type="text"
				placeholder="Post title"
			/>

			<textarea
				className={styles.description}
				value={post.body}
				onChange={(e) => setPost({ ...post, body: e.target.value })}
				type="text"
				placeholder="Post article"
			/>
			<Button onClick={addNewPosts}>create post</Button>
		</form>
	);
}

export default PostForm;
