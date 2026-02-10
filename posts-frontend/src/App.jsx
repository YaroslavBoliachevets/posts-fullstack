import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";

// создает контекст для доступа к глобальной переменной isAuth
import { AuthContext } from "./context/context.js";

// маршрутизация по страничкам
import AppRouter from "./components/AppRouter.jsx";

import Navbar from "./components/UI/navbar/Navbar.jsx";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("auth")) {
			setIsAuth(true);
		}
		setIsLoading(false);
	}, []);
	return (
		// тут передаем переменные в провайдер
		<AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}
export default App;
