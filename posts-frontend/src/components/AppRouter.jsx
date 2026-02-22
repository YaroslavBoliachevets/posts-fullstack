import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/Routes.jsx";
// import { AuthContext } from "../context/context.js";
import { AuthContext } from "../models/AuthContextType";
import Loader from "./UI/loader/Loader.jsx";

function AppRouter() {
	// берем из context значение глобальной переменной
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}
	// в зависимости от переменной isAuth будут доступны приватные или публичные пути, в публичном только авторизация
	return isAuth ? (
		<Routes>
			{privateRoutes.map(({ path, element }) => {
				return <Route key={path} path={path} element={element} />;
			})}
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map(({ path, element }) => {
				return <Route key={path} path={path} element={element} />;
			})}
		</Routes>
	);
}

export default AppRouter;
