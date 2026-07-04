import React, { useState, useContext } from "react";
import styles from "./PostForm.module.css";

import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

import { Context } from "../main";
import clsx from "clsx";
import { IPost } from "../models/IPost";

export interface PostFormProps {
	change: (post: IPost) => void;
	buttonName: string;
	formPost?: Partial<IPost>;
}

interface IFormState {
	title: string;
	body: string;
	id?: number;
}

function PostForm({ change, buttonName, formPost = {} }: PostFormProps) {
	const [post, setPost] = useState<IFormState>({
		title: formPost.title ?? "",
		body: formPost.body ?? "",
		...formPost,
	});

	const [errors, setErrors] = useState<{ title: boolean; body: boolean }>({
		title: false,
		body: false,
	});
	const { store } = useContext(Context);

	const changePost = (e: React.MouseEvent<HTMLButtonElement>) => {
		const userId = store.user?.id;
		e.preventDefault();
		const title = post.title.trim();
		const body = post.body.trim();
		const newErrors = {
			title: Boolean(!title),
			body: Boolean(!body),
		};
		setErrors(newErrors);
		if (newErrors.title || newErrors.body) return;
		change({ ...post, userId } as IPost);
	};

	return (
		<form className={styles.form}>
			{errors.title && (
				<span className={clsx(styles.error, styles.errorTitle)}>
					* Required field
				</span>
			)}
			<Input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPost({ ...post, title: e.target.value })
				}
				value={post.title}
				type="text"
				placeholder="Post title"
				className={errors.title ? styles.accent : undefined}
			/>

			{errors.body && (
				<span className={clsx(styles.error, styles.errorBody)}>
					* Required field
				</span>
			)}
			<textarea
				className={clsx(styles.description, errors.body && styles.accent)}
				value={post.body}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					setPost({ ...post, body: e.target.value })
				}
				placeholder="Post article"
			/>
			<Button onClick={changePost}>{buttonName}</Button>
		</form>
	);
}

export default PostForm;
