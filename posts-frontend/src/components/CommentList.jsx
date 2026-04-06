import React from "react";
import styles from "./CommentList.module.css";
import { Context } from "../main";
import { useContext } from "react";
import Button from "./UI/button/Button";
import clsx from "clsx";

function CommentList({ comments, deleteComment, setComment }) {
	const { store } = useContext(Context);
	return (
		<>
			{comments.map((comment) => {
				return (
					<div
						className={clsx(
							styles.comment,
							store?.user?.email == comment?.user?.email && styles.myComment,
						)}
						key={comment.id}
					>
						<div className={styles.meta}>
							{store.user.email == comment.user.email ? (
								<span className={styles.badge}>your comment</span>
							) : (
								<span className={styles.email}>{comment.user.email}</span>
							)}
						</div>
						<div className={styles.body}>{comment.body}</div>
						{store.user.email == comment.user.email ? (
							<div className={styles.actions}>
								<Button
									onClick={() => deleteComment(comment.id)}
									disabled={store.isGuest}
								>
									delete
								</Button>
								<Button onClick={() => setComment(comment)} disabled={store.isGuest}>
									upd
								</Button>
							</div>
						) : (
							""
						)}
					</div>
				);
			})}
		</>
	);
}

export default CommentList;
