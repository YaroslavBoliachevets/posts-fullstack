import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
// import { AuthContext } from "../../context/context";
// import { AuthContext } from "../../models/AuthContextType";
import { Context } from "../../main";
// import { observer } from "mobx-react-lite";

function Login() {
	// const { isAuth, setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { store } = useContext(Context);

	const login = async (e) => {
		e.preventDefault();
		console.log("login");
		await store.login(email, password);
		// const userData = { email, password };
		// setIsAuth(!isAuth);
		// localStorage.setItem("auth", "true");
		navigate("/posts");
	};

	const registration = async (e) => {
		e.preventDefault();
		// console.log("registration");
		await store.registration(email, password);
	};

	return (
		<div className="container">
			<div className={styles.loginPage}>
				<h1 className={styles.title}>log in or continue as a guest </h1>
				<form className={styles.form}>
					<Input
						value={email}
						type="text"
						placeholder="login"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						value={password}
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className={styles.actions}>
						<Button onClick={(e) => login(e)}>login</Button>
						<Button onClick={(e) => registration(e)}>registration</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

// export default observer(Login);
export default Login;
