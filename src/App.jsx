import React, { useState, useEffect } from "react";
import "./styles/App.css";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/modal/Modal";
import Pagination from './components/UI/pagination/Pagination';

import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePost";
import { useFetching } from "./hooks/useFetching";

import PostService from "./API/PostService";
import Loader from './components/UI/loader/Loader';

import {getPagesCount, getPagesArray} from './utils/pages';

function App() {
	// const [posts, setPosts] = useState([
	// 	{ id: 1, title: "ддд", body: "тов" },
	// 	{ id: 2, title: "хбб", body: "ггг" },
	// 	{ id: 3, title: "ввв", body: "ддд" },
	// ]);

	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: "", query: "" });
	const [modal, setModal] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	let pagesArray = getPagesArray(totalPages);

	const changePage= async(page) =>{ 
		setPage(page);
		fetchPosts();
	}

  	const [fetchPosts, isPostLoading, postError] = useFetching( async()=> {
	const responce = await PostService.getAll(limit, page);
		setPosts(responce.data)
		setTotalCount(responce.headers["x-total-count"]);
		const totalCount = responce.headers["x-total-count"];
		setTotalPages(getPagesCount(totalCount, limit));

	}); 

	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};


	// выполняется в начале и следит за изменением [page] в пагинации
	useEffect(() => {
		fetchPosts();
	}, [page]);

	return (
		<>
			<div className="App">
				<MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
				<Modal visible={modal} setVisible={setModal}>
					<PostForm create={createPost} />
				</Modal>

				<hr style={{ margin: "15px 0" }} />
				<PostFilter filter={filter} setFilter={setFilter} />


				{postError && <h1>Произошла ошибка {postError}</h1>}

         {isPostLoading ? <Loader/>
         : <PostList
					posts={sortedAndSearchPosts}
					title="посты про JS"
					remove={removePost}
				/>}

				<Pagination totalPages={totalPages} changePage={changePage} page={page}/>
				
			</div>
		</>
	);
}
export default App;
