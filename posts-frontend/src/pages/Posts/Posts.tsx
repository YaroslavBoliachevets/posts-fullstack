import { useState, useEffect, useRef, useContext } from "react";
import "../../styles/App.css";
import styles from "./Posts.module.css";

import PostList from "../../components/PostList";
import PostForm from "../../components/PostForm";
import PostFilter from "../../components/PostFilter";
import Modal from "../../components/UI/modal/Modal";

import Button from "../../components/UI/button/Button";
import { usePosts } from "../../hooks/usePost";
import { useFetching } from "../../hooks/useFetching";

import PostService from "../../services/PostService";
import Loader from "../../components/UI/loader/Loader";

import { getPagesCount } from "../../utils/pages";
import { useObserver } from "../../hooks/useObserver";
import { Context } from "../../main";
import Select from "../../components/UI/select/Select";
import { IPost } from "../../models/IPost";
import { observer } from "mobx-react-lite";

export interface IFilter {
	sort: string;
	query: string;
}

function Posts() {
	const [posts, setPosts] = useState<IPost[]>([]);

	const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
	const [modal, setModal] = useState<boolean>(false);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);

	const { store } = useContext(Context);
	// находим последний эл чтобы при его появлении подгружать новые посты (для инфинити скролла)
	const lastElement = useRef<HTMLDivElement | null>(null);

	const changeLimit = (limit: number) => {
		setPosts([]);
		setLimit(limit);
		// при обновлении лимита страница прыгает на +1
		setPage(1);
	};

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		const postsArray = response.data.posts;
		setPosts([...posts, ...postsArray]);
		const totalPosts = response.data.totalPosts;
		setTotalPages(getPagesCount(totalPosts, limit));
	}) as [() => Promise<void>, boolean, string];

	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

	const createPost = async (newPost: IPost) => {
		const response = await PostService.createNewPost(newPost);
		setPosts([response.data, ...posts]);
		setModal(false);
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
								onChange={(value: number) => changeLimit(value)}
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
				{postError && <h1>An error has occurred {postError}</h1>}

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
						{isPostsLoading && <Loader />}
					</div>
				</div>
			</div>
		</>
	);
}
export default observer(Posts);
