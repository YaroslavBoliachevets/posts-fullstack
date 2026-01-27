import React, { useState, useEffect, useRef } from "react";
import "../../styles/App.css";
import styles from "./Posts.module.css";
import clsx from "clsx";

import PostList from "../../components/PostList";
import PostForm from "../../components/PostForm";
import PostFilter from "../../components/PostFilter";
import Modal from "../../components/UI/modal/Modal";
// import Pagination from "../../components/UI/pagination/Pagination";

import MyButton from "../../components/UI/button/MyButton";
import { usePosts } from "../../hooks/usePost";
import { useFetching } from "../../hooks/useFetching";

import PostService from "../../API/PostService";
import Loader from "../../components/UI/loader/Loader";

import { getPagesCount, getPagesArray } from "../../utils/pages";
import { useObserver } from "../../hooks/useObserver";
import MySelect from "../../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: "", query: "" });
	const [modal, setModal] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	// находим последний эл чтобы при его появлении подгружать новые посты (для инфинити скролла)
	const lastElement = useRef();

	let pagesArray = getPagesArray(totalPages);

	const changePage = async (page) => {
		setPage(page);
	};

	const changeLimit = (limit) => {
		console.log(isPostsLoading, "change limit");
		setPosts([]);
		setLimit(limit);
		// при обновлении лимита страница прыгает на +1
		setPage(0);
	};

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const responce = await PostService.getAll(limit, page);
		setPosts([...posts, ...responce.data]);
		setTotalCount(responce.headers["x-total-count"]);
		const totalCount = responce.headers["x-total-count"];
		setTotalPages(getPagesCount(totalCount, limit));
	});

	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

	const createPost = (newPost) => {
		setPosts([newPost, ...posts]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	useObserver(
		lastElement,
		page < totalPages && posts.length > 0,
		isPostsLoading,
		() => {
			setPage((prev) => prev + 1);
		},
	);

	// выполняется в начале и следит за изменением [page] в пагинации
	useEffect(() => {
		fetchPosts();
	}, [page, limit]);

	return (
		<>
			<div>
				<div className="background-wrap">
					<div className={clsx("container", styles.toolbar)}>
						<MyButton onClick={() => setModal(true)}>create post</MyButton>
						<Modal visible={modal} setVisible={setModal}>
							<PostForm create={createPost} />
						</Modal>

						<div className={styles.controls}>
							<PostFilter
								className={styles.filter}
								filter={filter}
								setFilter={setFilter}
							/>
							<MySelect
								value={limit}
								onChange={(value) => changeLimit(value)}
								defaultValue={"posts per page"}
								options={[
									{ value: 5, name: "5" },
									{ value: 10, name: "10" },
									{ value: 25, name: "25" },
									{ value: -1, name: "show all" },
								]}
							/>
						</div>
					</div>
				</div>
				{postError && <h1>An error has occurred {postError}</h1>}

				<div className="background-wrap">
					<div className="container">
						<PostList
							className={styles.postlist}
							posts={sortedAndSearchPosts}
							title="Posts"
							remove={removePost}
						/>
						{/* ref={lastElement} автоматически кладет в коробку lastElement.current =  наш div
						 */}
						<div ref={lastElement} style={{ height: 2 }}></div>
						{isPostsLoading && <Loader />}

						{/* <Pagination totalPages={totalPages} changePage={changePage} page={page} /> */}
					</div>
				</div>
			</div>
		</>
	);
}
export default Posts;
