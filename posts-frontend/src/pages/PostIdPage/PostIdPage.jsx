import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./PostIdPage.module.css";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostService from "../../services/PostService";
import Loader from "../../components/UI/loader/Loader";
import Button from "../../components/UI/button/Button";
import { Context } from "../../main";
import CommentService from "../../services/CommentService";
import CommentForm from "../../components/UI/commentForm/CommentForm";
import CommentList from "../../components/CommentList";

function PostIdPage() {
	const { store } = useContext(Context);
	// console.log(store.user.email, "store");
	// хук для получания параметра из динамически созданого url /posts/:id
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [comment, setComment] = useState(null);

	// загрузка по id
	const [fetchPostById, isLoading, error] = useFetching(async (params) => {
		const responce = await PostService.getById(id);
		setPost(responce.data);
	});

	const [fetchComments, isComLoading, errorComments] = useFetching(
		async (params) => {
			const response = await CommentService.getAll(id);
			setComments(response.data);
		},
	);

	// следим за id потому что при первом он может быть недоступный, потом вызывается fetchPostById, уже с неё async useFetching, после обновляется состояние
	useEffect(() => {
		if (id !== undefined) {
			fetchPostById(id);
			fetchComments(id);
		}
	}, [id]);

	async function addNewComment(comment) {
		const userId = store.user.id;
		const postId = Number(id);
		const newComment = await CommentService.create({
			body: comment,
			postId,
			userId,
		});
		setComments((prev) => [...prev, newComment.data]);
		shouldScroll.current = true;
		setComment("");
	}

	async function deleteComment(id) {
		await CommentService.delete(id);
		setComments(comments.filter((p) => p.id !== id));
	}

	async function updateComment(comment) {
		await CommentService.update(comment);
		setComments((prev) => prev.map((p) => (p.id == comment.id ? comment : p)));
		setComment(null);
	}

	return (
		<div className="container">
			<div className={styles.wrap}>
				<div className={styles.postSection}>
					<h1 className={styles.title}>{post.title}</h1>

					{isLoading ? (
						<Loader />
					) : (
						<div className={styles.postBody}>{post.body}</div>
					)}
				</div>

				{isComLoading ? (
					<Loader />
				) : (
					<div className={styles.commentsSection}>
						{comments.length == 0 && (
							<h2 className={styles.noComments}>No comments here yet...</h2>
						)}

						<CommentList
							comments={comments}
							setComment={setComment}
							deleteComment={deleteComment}
						/>
					</div>
				)}
				<CommentForm
					initialComment={comment}
					onCreate={addNewComment}
					onUpdate={updateComment}
				/>
			</div>
		</div>
	);
}

export default PostIdPage;
