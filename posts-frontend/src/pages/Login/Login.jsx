import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/UI/button/MyButton";
import MyInput from "../../components/UI/input/MyInput";
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
					<MyInput
						value={email}
						type="text"
						placeholder="login"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<MyInput
						value={password}
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className={styles.actions}>
						<MyButton onClick={(e) => login(e)}>login</MyButton>
						<MyButton onClick={(e) => registration(e)}>registration</MyButton>
					</div>
				</form>
			</div>
		</div>
	);
}

// export default observer(Login);
export default Login;
