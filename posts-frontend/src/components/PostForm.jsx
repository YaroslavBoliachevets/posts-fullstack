import React, { useState } from "react";
import styles from "./PostForm.module.css";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

function PostForm({ create }) {
	const [post, setPost] = useState({ title: "", body: "" });

	const addNewPosts = (e) => {
		e.preventDefault();
		create({ ...post, id: Date.now() });
		setPost({ title: "", body: "" });
	};

	return (
		<form className={styles.form}>
			<MyInput
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
			<MyButton onClick={addNewPosts}>create post</MyButton>
		</form>
	);
}

export default PostForm;
