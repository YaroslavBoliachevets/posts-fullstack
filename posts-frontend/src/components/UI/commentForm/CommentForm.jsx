import React from "react";
import styles from "./CommentForm.module.css";
import { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import { Context } from "../../../main";
import { useContext, useEffect } from "react";

function CommentForm({ initialComment, onCreate, onUpdate }) {
	const { store } = useContext(Context);
	const isEdit = Boolean(initialComment);
	const [text, setText] = useState(initialComment?.body ?? "");
	useEffect(() => {
		setText(initialComment?.body ?? "");
	}, [initialComment]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEdit) {
			onUpdate({ ...initialComment, body: text });
		} else {
			onCreate(text);
		}
		setText("");
	};

	return (
		<div className={styles.wrap}>
			<form action="">
				<Input
					placeholder="Leave a comment"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></Input>
				<Button onClick={(e) => handleSubmit(e)} disabled={store.isGuest}>
					{isEdit ? "update" : "send"}
				</Button>
			</form>
		</div>
	);
}
export default CommentForm;
