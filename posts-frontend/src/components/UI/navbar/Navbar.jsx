import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../button/Button";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

import styles from "./Navbar.module.css";

function Navbar() {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		store.logout();
		navigate("/login");
	};

	const login = () => {
		navigate("/login");
	};

	const isLoginPage = location.pathname === "/login";
	return (
		<div className="background-wrap">
			<div className={`container ${styles.nav}`}>
				{store.isAuth && (
					<Button variant="primary" onClick={logout}>
						exit
					</Button>
				)}

				{store.isGuest && !store.isAuth && !isLoginPage && (
					<Button variant="primary" onClick={login}>
						login
					</Button>
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

export default observer(Navbar);
