import React, { useState, useContext } from "react";
import styles from "./PostForm.module.css";

import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

import { Context } from "../main";
import { form } from "motion/react-client";

function PostForm({ change, buttonName, formPost = {} }) {
	const [post, setPost] = useState({
		title: formPost.title ?? "",
		body: formPost.body ?? "",
		...formPost,
	});
	const { store } = useContext(Context);

	const changePost = (e) => {
		const userId = store.user.id;
		e.preventDefault();
		change({ ...post, userId });
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
			<Button onClick={changePost}>{buttonName}</Button>
		</form>
	);
}

export default PostForm;
