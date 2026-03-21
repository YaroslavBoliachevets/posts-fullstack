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

function PostIdPage() {
	const { store } = useContext(Context);
	// хук для получания параметра из динамически созданого url /posts/:id
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [comment, setComment] = useState("");

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

	async function addNewComment(e) {
		e.preventDefault();
		const userId = store.user.id;
		const postId = Number(id);
		const newComment = { body: comment, postId, userId };
		await CommentService.create(newComment);
		setComment("");
		fetchComments(id);
	}

	return (
		<div className="container">
			<div className={styles.postInfo}>
				<h1 className={styles.title}>{post.title}</h1>

				{isLoading ? <Loader /> : <div>{post.body}</div>}

				<div>
					<form action="">
						<Input
							placeholder="Leave a comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></Input>
						<Button onClick={addNewComment} disabled={store.isGuest}>
							send
						</Button>
					</form>
				</div>

				{isComLoading ? (
					<Loader />
				) : (
					<div className={styles.comments}>
						{comments.map(({ id, body, user }) => {
							return (
								<div className={styles.comment} key={id}>
									<div className={styles.meta}>
										<span className={styles.email}>{user.email}</span>
									</div>
									<div className={styles.body}>{body}</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default PostIdPage;
