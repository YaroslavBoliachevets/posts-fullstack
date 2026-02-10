import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context/context";

import styles from "./Navbar.module.css";

function Navbar() {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem("auth");
		// перекидает на страницу входа
		navigate("/login");
	};
	return (
		<div className="background-wrap">
			<div className={`container ${styles.nav}`}>
				{isAuth ? (
					<MyButton variant="primary" onClick={logout}>
						exit
					</MyButton>
				) : (
					""
				)}
				<div className={styles.links}>
					<Link className={styles.link} to="/about">
						about
					</Link>
					<Link className={styles.link} to="/posts">
						posts
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
