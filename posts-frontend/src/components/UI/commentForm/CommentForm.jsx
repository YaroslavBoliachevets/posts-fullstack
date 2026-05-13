import React from "react";
import styles from "./CommentForm.module.css";
import { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import { Context } from "../../../main";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { toastPromise, COMMENT_MESSAGES } from "../../../shared/lib/toast";
import { ToasterProvider } from "../../../shared/ui/ToasterProvider";

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
			toastPromise(
				onUpdate({ ...initialComment, body: text }),
				COMMENT_MESSAGES.update,
			);
		} else {
			toastPromise(onCreate(text), COMMENT_MESSAGES.create);
		}
		setText("");
	};

	return (
		<div className={styles.wrap}>
			<form className={styles.form} action="">
				<Input
					placeholder="Leave a comment"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className={styles.input}
				></Input>
				<Button
					onClick={(e) => handleSubmit(e)}
					disabled={store.isGuest || !store.user}
				>
					{isEdit ? "update" : "send"}
				</Button>
			</form>
			<ToasterProvider />
		</div>
	);
}
export default CommentForm;
