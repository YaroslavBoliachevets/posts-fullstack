import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About.jsx";
import Posts from "../pages/Posts.jsx";
import Error from "../pages/Error.jsx";

function AppRouter() {
	return (
		<Routes>
			<Route path="/about" element={<About />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="/error" element={<Error />} />

			{/* перенаправляет все неправильные пути на страницу с ошибкой */}
			<Route path="*" element={<Navigate to="/error" replace />} />
		</Routes>
	);
}

export default AppRouter;
