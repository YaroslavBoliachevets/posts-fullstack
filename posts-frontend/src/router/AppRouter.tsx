import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes, RoutePath } from "./Routes";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import Error from "../pages/Error.jsx";
import Loader from "../components/UI/loader/Loader.jsx";

function AppRouter() {
	// берем из context значение глобальной переменной
	const { store } = useContext(Context);
	const { setGuest, checkAuth } = store;

	useEffect(() => {
		if (localStorage.getItem("guest") === "true") {
			setGuest(true);

			return;
		}

		if (localStorage.getItem("token")) {
			checkAuth();
		} else {
			store.setIsLoading(false);
		}
	}, [store]);

	if (store.isLoading) {
		return <Loader />;
	}

	const hasAccess = store.isAuth || store.isGuest;

	// в зависимости от переменной isAuth будут доступны приватные или публичные пути, в публичном только авторизация

	return (
		<Routes>
			{hasAccess ? (
				<>
					{privateRoutes.map(({ path, element }) => {
						return <Route key={path} path={path} element={element} />;
					})}
					<Route path="*" element={<Error />}></Route>
				</>
			) : (
				<>
					{publicRoutes.map(({ path, element }) => {
						return <Route key={path} path={path} element={element} />;
					})}
					<Route
						path="*"
						element={<Navigate to={RoutePath.LOGIN} replace />}
					></Route>
				</>
			)}
		</Routes>
	);
}

export default observer(AppRouter);
