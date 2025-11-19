import React, { useState, useEffect } from "react";
import "./styles/App.css";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/modal/Modal";

import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePost";
import { useFetching } from "./hooks/useFetching";

import PostService from "./API/PostService";
import Loader from './components/UI/loader/Loader';

function App() {
	// const [posts, setPosts] = useState([
	// 	{ id: 1, title: "ддд", body: "тов" },
	// 	{ id: 2, title: "хбб", body: "ггг" },
	// 	{ id: 3, title: "ввв", body: "ддд" },
	// ]);

	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: "", query: "" });
	const [modal, setModal] = useState(false);
  const [fetchPosts, isPostLoading, postError] = useFetching( async()=> {const posts = await PostService.getAll();
		setPosts(posts)});

	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	// async function fetchPosts() {
	// 	setIsPostLoading(true);
    // setTimeout(async()=> {const posts = await PostService.getAll();
	// 	setPosts(posts);
	// 	setIsPostLoading(false);}, 2000)
    
		
	// }

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
         
				
			</div>
		</>
	);
}
export default App;
