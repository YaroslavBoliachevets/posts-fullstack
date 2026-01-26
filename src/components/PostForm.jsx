import React, { useState } from "react";
import styles from "./PostForm.module.css";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/myInput";

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
				placeholder="Название поста"
			/>

			<textarea
				className={styles.description}
				value={post.body}
				onChange={(e) => setPost({ ...post, body: e.target.value })}
				type="text"
				placeholder="Описание поста"
			/>
			<MyButton onClick={addNewPosts}>Создать пост</MyButton>
		</form>
	);
}

export default PostForm;
