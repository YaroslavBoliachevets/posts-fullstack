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
import { ICommentCreate } from "../../models/IComment";
import { IPost } from "../../models/IPost";
import { RoutePath } from "../../router/Routes";

function PostIdPage() {
	const { store } = useContext(Context);
	// console.log(store.user.email, "store");
	// хук для получания параметра из динамически созданого url /posts/:id
	const { id } = useParams();
	// из параметра мы получаем строку, но нам нужно число - тут переводим или берем 0
	const numericId = id ? Number(id) : 0;

	const [post, setPost] = useState<IPost | null>(null);
	const [comments, setComments] = useState<ICommentCreate[]>([]);

	const [comment, setComment] = useState<ICommentCreate | null>(null);
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();
	const shouldScroll = useRef<boolean>(false);

	// загрузка по id
	const [fetchPostById, isLoading, error] = useFetching(async () => {
		// если нет ид, не делаем запрос
		if (!id) return;

		if (isNaN(Number(id))) {
			navigate(RoutePath.ERROR);
			return;
		}

		try {
			const response = await PostService.getById(numericId);
			const date = formatDate(response.data.createdAt);
			setPost({ ...response.data, createdAt: date });
		} catch (error) {
			console.log("Post fetch error:", error);
			navigate(RoutePath.ERROR);
		}
	});

	const [fetchComments, isComLoading, errorComments] = useFetching(async () => {
		const response = await CommentService.getAll(numericId);
		setComments(response.data);
	});

	// следим за id потому что при первом он может быть недоступный, потом вызывается fetchPostById, уже с неё async useFetching, после обновляется состояние
	useEffect(() => {
		if (id !== undefined) {
			fetchPostById();
			fetchComments();
		}
	}, [id]);

	async function addNewComment(commentBody: string) {
		if (!store.user || !store.user.id) {
			console.warn("User is not authenticated");
			return;
		}
		const userId = Number(store.user.id);
		const postId = numericId;

		try {
			const response = await CommentService.create({
				body: commentBody,
				postId,
				userId,
			});

			if (response && response.data) {
				setComments((prev) => [...prev, response.data]);
			}

			if (typeof shouldScroll !== "undefined" && shouldScroll) {
				shouldScroll.current = true;
			}
			setComment(null);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async function deleteComment(id: number) {
		try {
			const response = await CommentService.delete(id);
			if (response && response.data) {
				setComments(comments.filter((p) => p.id !== id));
			}
			return response;
		} catch (error) {
			throw error;
		}
	}

	async function updateComment(comment: ICommentCreate) {
		try {
			const response = await CommentService.update(comment);
			if (response && response.data) {
				setComments((prev) =>
					prev.map((p) => (p.id == comment.id ? response.data : p)),
				);
				setComment(null);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}

	function openModal() {
		setModal(true);
	}

	const updatePost = async (post: Omit<IPost, "user" | "createdAt">) => {
		try {
			const response = await PostService.updatePost(post);
			if (response && response.data) {
				setPost(response.data);
				setModal(false);
			}
			return response;
		} catch (error) {
			throw error;
		}
	};

	const removePost = async (e: React.SyntheticEvent) => {
		e.stopPropagation();
		if (!post) return;
		await PostService.deletePost(post.id);
		navigate("/posts");
	};

	if (isLoading || !post) return <Loader></Loader>;

	return (
		<div className="container">
			<div className={styles.wrap}>
				<div className={styles.postSection}>
					<div className={styles.postCreateData}>
						<p className={styles.createInfo}> {post?.createdAt}</p>
						<p className={styles.createInfo}> {post?.user?.email}</p>
					</div>

					<h1 className={styles.title}>{post.title}</h1>

					<div className={styles.postBody}>{post.body}</div>

					{store?.user?.email == post?.user?.email && (
						<div>
							<Button
								onClick={(e) => {
									openModal();
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
					initialComment={comment || undefined}
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
