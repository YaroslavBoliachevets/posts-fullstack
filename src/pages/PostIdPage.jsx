import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

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
		<div>
			<h1>Инфа по посту {id} </h1>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{id}
					{post.title}
				</div>
			)}

			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(({ name, email, body }) => {
						return (
							<div className="">
								{" "}
								<h5>{email}</h5>
								<div className="">{body}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default PostIdPage;
