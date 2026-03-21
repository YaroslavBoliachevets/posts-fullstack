import React, { useState, useContext } from "react";
import styles from "./PostForm.module.css";

import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

import { Context } from "../main";

function PostForm({ create }) {
	const [post, setPost] = useState({ title: "", body: "" });
	const { store } = useContext(Context);

	const addNewPosts = (e) => {
		const userId = store.user.id;
		e.preventDefault();
		create({ ...post, userId });
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
