import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/UI/button/MyButton";
import MyInput from "../../components/UI/input/myInput";
import { AuthContext } from "../../context/context";

function Login() {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();
		setIsAuth(!isAuth);
		localStorage.setItem("auth", "true");
		navigate("/posts");
	};
	return (
		<div className="container">
			<div className={styles.loginPage}>
				<h1 className={styles.title}>log in or continue as a guest </h1>
				<form className={styles.form} onSubmit={login}>
					<MyInput type="text" placeholder="login" />
					<MyInput type="password" placeholder="password" />
					<div className={styles.actions}>
						<MyButton>login</MyButton>
						<MyButton>continue as a guest</MyButton>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
