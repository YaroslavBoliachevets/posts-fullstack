import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About.jsx";
import Posts from "../pages/Posts.jsx";
import Error from "../pages/Error.jsx";
import PostIdPage from "../pages/PostIdPage.jsx";

function AppRouter() {
	return (
		<Routes>
			<Route path="/about" element={<About />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="/posts/:id" element={<PostIdPage />} />
			<Route path="/error" element={<Error />} />

			{/* перенаправляет все неправильные пути на страницу с постами  */}
			<Route path="*" element={<Navigate to="/posts" replace />} />
		</Routes>
	);
}

export default AppRouter;
