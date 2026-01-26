import React, { useContext } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/myInput";
import { AuthContext } from "../context/context";

function Login() {
	const { isAuth, setIsAuth } = useContext(AuthContext);

	const login = (e) => {
		e.preventDefault();
		setIsAuth(!isAuth);
		localStorage.setItem("auth", "true");
	};
	return (
		<div>
			<h1>страница для логина </h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder="введите логин" />
				<MyInput type="password" placeholder="введите пароль" />
				<MyButton>войти</MyButton>
				<MyButton>войти как гость</MyButton>
			</form>
		</div>
	);
}

export default Login;
