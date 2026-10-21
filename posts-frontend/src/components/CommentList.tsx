import React from "react";
import styles from "./CommentList.module.css";
import { Context } from "../main";
import { useContext } from "react";
import Button from "./UI/button/Button";
import clsx from "clsx";
import { notifyCommentDeleted } from "../shared/lib/toast";
import { ICommentCreate } from "../models/IComment";
import { AxiosResponse } from "axios";

interface ICommentList {
	// Нужно поправить модель айкоммент крейт
	comments: (ICommentCreate & { user?: { email: string } })[];
	deleteComment: (id: number) => Promise<AxiosResponse<ICommentCreate>>;
	setComment: React.Dispatch<React.SetStateAction<ICommentCreate | null>>;
}

function CommentList({ comments, deleteComment, setComment }: ICommentList) {
	const { store } = useContext(Context);

	const handleCommentDelete = (id: number) => {
		deleteComment(id);
		notifyCommentDeleted();
	};

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
							{store.user?.email == comment.user?.email ? (
								<span className={styles.badge}>your comment</span>
							) : (
								<span className={styles.email}>{comment.user?.email}</span>
							)}
						</div>
						<div className={styles.body}>{comment.body}</div>
						{store.user?.email == comment.user?.email ? (
							<div className={styles.actions}>
								<Button
									// нужно поправить модель ICommentCreate
									onClick={() => handleCommentDelete(comment.id!)}
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
