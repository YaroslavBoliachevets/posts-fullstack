import React, { useContext, useEffect, useState } from "react";
import styles from "./PostIdPage.module.css";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostService from "../../services/PostService";
import Loader from "../../components/UI/loader/Loader";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { Context } from "../../main";
import CommentService from "../../services/CommentService";
import CommentForm from "../../components/UI/commentForm/CommentForm";

function PostIdPage() {
	const { store } = useContext(Context);
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
		const newComment = { body: comment, postId, userId };
		await CommentService.create(newComment);
		setComment("");
		fetchComments(id);
	}

	async function deleteComment(id) {
		await CommentService.delete(id);
		setComments(comments.filter((p) => p.id !== id));
	}

	async function updateComment(comment) {
		await CommentService.update(comment);
		setComments((prev) => prev.map((p) => (p.id == comment.id ? comment : p)));
	}

	async function updateClick(body) {
		console.log(body);
		// setComment(body);
	}

	return (
		<div className="container">
			<div className={styles.postInfo}>
				<h1 className={styles.title}>{post.title}</h1>

				{isLoading ? <Loader /> : <div>{post.body}</div>}

				{isComLoading ? (
					<Loader />
				) : (
					<div className={styles.comments}>
						{comments == 0 && <h2>No comments here yet...</h2>}
						{comments.map((comment) => {
							return (
								<div className={styles.comment} key={comment.id}>
									<div className={styles.meta}>
										<span className={styles.email}>{comment.user.email}</span>
									</div>
									<div className={styles.body}>{comment.body}</div>
									<Button onClick={() => deleteComment(id)} disabled={store.isGuest}>
										delete
									</Button>
									<Button onClick={() => setComment(comment)} disabled={store.isGuest}>
										upd
									</Button>
								</div>
							);
						})}
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
