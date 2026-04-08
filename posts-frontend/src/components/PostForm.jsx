import React, { useState, useContext } from "react";
import styles from "./PostForm.module.css";

import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

import { Context } from "../main";
import { form } from "motion/react-client";
import clsx from "clsx";

function PostForm({ change, buttonName, formPost = {} }) {
	const [post, setPost] = useState({
		title: formPost.title ?? "",
		body: formPost.body ?? "",
		...formPost,
	});

	const [errors, setErrors] = useState({
		title: false,
		body: false,
	});
	const { store } = useContext(Context);

	const changePost = (e) => {
		const userId = store.user.id;
		e.preventDefault();

		const title = post.title.trim();
		const body = post.body.trim();
		console.log(
			" ---title---",
			title,
			"---body---",
			body,
			"if (body)",
			Boolean(body),
		);
		const newErrors = {
			title: Boolean(!title),
			body: Boolean(!body),
		};
		setErrors(newErrors);
		console.log("errors", errors);

		if (newErrors.title || newErrors.body) return;
		change({ ...post, userId });
	};

	return (
		<form className={styles.form}>
			{errors.title && (
				<span className={clsx(styles.error, styles.errorTitle)}>
					* Required field
				</span>
			)}
			<Input
				onChange={(e) => setPost({ ...post, title: e.target.value })}
				value={post.title}
				type="text"
				placeholder="Post title"
				className={errors.title && styles.accent}
			/>

			{errors.body && (
				<span className={clsx(styles.error, styles.errorBody)}>
					* Required field
				</span>
			)}
			<textarea
				className={clsx(styles.description, errors.body && styles.accent)}
				value={post.body}
				onChange={(e) => setPost({ ...post, body: e.target.value })}
				type="text"
				placeholder="Post article"
			/>
			<Button
				onClick={changePost}
				// disabled={!post.title.trim() || !post.body.trim()}
			>
				{buttonName}
			</Button>
		</form>
	);
}

export default PostForm;
