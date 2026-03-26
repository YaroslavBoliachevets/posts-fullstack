import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/Routes.jsx";
// import { AuthContext } from "../context/context.js";
import { AuthContext } from "../models/AuthContextType";
import Loader from "./UI/loader/Loader.jsx";
import { Context } from "../main.tsx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function AppRouter() {
	// берем из context значение глобальной переменной
	// const { isAuth, isLoading } = useContext(AuthContext);
	const { store } = useContext(Context);
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("guest") === "true") {
			store.setGuest(true);

			return;
		}

		if (localStorage.getItem("token")) {
			store.checkAuth();
		}

		if (store.isGuest == false && !localStorage.getItem("token")) {
			navigate("/login");
		}
	}, []);

	if (store.isLoading) {
		return <Loader />;
	}

	// ================================================================
	// в зависимости от переменной isAuth будут доступны приватные или публичные пути, в публичном только авторизация
	// return store.isAuth ? (
	// 	<Routes>
	// 		{privateRoutes.map(({ path, element }) => {
	// 			return <Route key={path} path={path} element={element} />;
	// 		})}
	// 	</Routes>
	// ) : (
	// 	<Routes>
	// 		{publicRoutes.map(({ path, element }) => {
	// 			return <Route key={path} path={path} element={element} />;
	// 		})}
	// 	</Routes>
	// );
	// ==========================================================

	return (
		<Routes>
			{privateRoutes.map(({ path, element }) => {
				return <Route key={path} path={path} element={element} />;
			})}
		</Routes>
	);
}

export default observer(AppRouter);
