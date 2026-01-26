import React, { useEffect, useState } from "react";
import styles from "./PostIdPage.module.css";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../../components/UI/loader/Loader";

function PostIdPage() {
	// хук для получания параметра из динамически созданого url /posts/:id
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	// загрузка по id
	const [fetchPostById, isLoading, error] = useFetching(async (params) => {
		const responce = await PostService.getById(id);
		setPost(responce.data);
	});

	const [fetchComments, isComLoading, errorComments] = useFetching(
		async (params) => {
			const responce = await PostService.getCommentsById(id);
			setComments(responce.data);
		},
	);

	// следим за id потому что при первом он может быть недоступный, потом вызывается fetchPostById, уже с неё async useFetching, после обновляется состояние
	useEffect(() => {
		if (id !== undefined) {
			fetchPostById(id);
			fetchComments(id);
		}
	}, [id]);
	return (
		<div className="container">
			<div className={styles.postInfo}>
				<h1 className={styles.title}>
					{id} {post.title}
				</h1>
				{isLoading ? <Loader /> : <div>{post.body}</div>}

				{isComLoading ? (
					<Loader />
				) : (
					<div className={styles.comments}>
						{comments.map(({ id, email, body }) => {
							return (
								<div className={styles.comment} key={id}>
									<div className={styles.meta}>
										<span className={styles.email}>{email}</span>
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
