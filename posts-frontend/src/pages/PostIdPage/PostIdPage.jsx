import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./PostIdPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostService from "../../services/PostService";
import Loader from "../../components/UI/loader/Loader";
import Button from "../../components/UI/button/Button";
import { Context } from "../../main";
import CommentService from "../../services/CommentService";
import CommentForm from "../../components/UI/commentForm/CommentForm";
import CommentList from "../../components/CommentList";
import formatDate from "../../utils/formatDate";
import Modal from "../../components/UI/modal/Modal";
import PostForm from "../../components/PostForm";

function PostIdPage() {
	const { store } = useContext(Context);
	// console.log(store.user.email, "store");
	// хук для получания параметра из динамически созданого url /posts/:id
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [comment, setComment] = useState(null);
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();

	// загрузка по id
	const [fetchPostById, isLoading, error] = useFetching(async () => {
		const response = await PostService.getById(id);
		const date = formatDate(response.data.createdAt);
		setPost({ ...response.data, createdAt: date });
	});

	const [fetchComments, isComLoading, errorComments] = useFetching(async () => {
		const response = await CommentService.getAll(id);
		setComments(response.data);
	});

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
		const request = await CommentService.create({
			body: comment,
			postId,
			userId,
		});

		request
			.then((newComment) => {
				setComments((prev) => [...prev, newComment.data]);
				shouldScroll.current = true;
				setComment("");
			})
			.catch((err) => {
				console.error("Create error:", err);
			});
		console.log("request:", request);
		// setComments((prev) => [...prev, newComment.data]);
		// shouldScroll.current = true;
		// setComment("");
		return request;
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

	function openModal() {
		setModal(true);
	}

	const updatePost = async (post) => {
		const response = await PostService.updatePost(post);
		console.log("res", response.data);
		setPost((prev) => ({
			...prev,
			title: response.data.title,
			body: response.data.body,
		}));
		setModal(false);
	};

	const removePost = async (e) => {
		e.stopPropagation();
		await PostService.deletePost(post.id);
		navigate("/posts");
	};

	return (
		<div className="container">
			<div className={styles.wrap}>
				<div className={styles.postSection}>
					<div className={styles.postCreateData}>
						<p className={styles.createInfo}> {post?.createdAt}</p>
						<p className={styles.createInfo}> {post?.user?.email}</p>
					</div>

					<h1 className={styles.title}>{post.title}</h1>

					{isLoading ? (
						<Loader />
					) : (
						<div className={styles.postBody}>{post.body}</div>
					)}

					{store?.user?.email == post?.user?.email && (
						<div>
							<Button
								onClick={(e) => {
									openModal(e);
								}}
							>
								update
							</Button>

							<Button
								onClick={(e) => {
									removePost(e);
								}}
							>
								delete
							</Button>
						</div>
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

			<Modal visible={modal} setVisible={setModal}>
				<PostForm buttonName={"update post"} change={updatePost} formPost={post} />
			</Modal>
		</div>
	);
}

export default PostIdPage;
