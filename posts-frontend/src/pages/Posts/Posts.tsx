import React, { useEffect, useRef, useContext } from "react";
import "../../styles/App.css";
import styles from "./Posts.module.css";

import PostList from "../../components/PostList";
import PostForm from "../../components/PostForm";
import PostFilter from "../../components/PostFilter";
import Modal from "../../components/UI/modal/Modal";

import Button from "../../components/UI/button/Button";
import { usePosts } from "../../hooks/usePost";

import Loader from "../../components/UI/loader/Loader";

import { useObserver } from "../../hooks/useObserver";
import { Context } from "../../main";
import Select from "../../components/UI/select/Select";
import { IPost } from "../../models/IPost";
import { observer } from "mobx-react-lite";

import { postStore } from "../../store/PostStore";

export interface IFilter {
	sort: keyof IPost | "";
	query: string;
}
const Posts = observer(() => {
	const {
		posts,
		createPost,
		filter,
		setFilter,
		modal,
		setModal,
		totalPages,
		limit,
		setLimit,
		page,
		isLoading,
		error,
		fetchPosts,
		nextPage,
	} = postStore;

	const { store } = useContext(Context);
	// находим последний эл чтобы при его появлении подгружать новые посты (для инфинити скролла)
	const lastElement = useRef<HTMLDivElement | null>(null);

	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

	useObserver(
		lastElement,
		page < totalPages && posts.length > 0,
		isLoading,
		nextPage,
	);

	// выполняется в начале и следит за изменением [page] в пагинации
	useEffect(() => {
		fetchPosts();
	}, [page, limit]);

	return (
		<>
			<div className="container">
				<div>
					<div className={styles.toolbar}>
						<Button
							onClick={() => setModal(true)}
							disabled={store.isGuest || !store.user}
						>
							create post
						</Button>
						<Modal visible={modal} setVisible={setModal}>
							<PostForm change={createPost} buttonName={"create post"} />
						</Modal>

						<div className={styles.controls}>
							<PostFilter
								className={styles.filter}
								filter={filter}
								setFilter={setFilter}
							/>
							<Select
								className={styles.filter}
								value={limit}
								onChange={setLimit}
								defaultValue={"posts per page"}
								options={[
									{ value: 5, name: "5" },
									{ value: 10, name: "10" },
									{ value: 25, name: "25" },
									{ value: 100, name: "show all" },
								]}
							/>
						</div>
					</div>
				</div>
				{error && <h1>An error has occurred {error}</h1>}

				<div className={styles.backgroundWrap}>
					<div className={styles.container}>
						<PostList
							className={styles.postlist}
							posts={sortedAndSearchPosts}
							title="Posts"
						/>
						{/* ref={lastElement} автоматически кладет в коробку lastElement.current =  наш div
						 */}
						<div ref={lastElement} style={{ height: 2 }}></div>
						{isLoading && <Loader />}
					</div>
				</div>
			</div>
		</>
	);
});
export default Posts;
