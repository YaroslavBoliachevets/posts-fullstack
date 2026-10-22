import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../button/Button";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { RoutePath } from "../../../router/Routes";

import styles from "./Navbar.module.css";

function Navbar() {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();

	const logout = async () => {
		await store.logout();
		navigate(RoutePath.LOGIN);
	};

	const isLoginPage = location.pathname === RoutePath.LOGIN;
	const isReady = !store.isLoading;

	const showExitButton = store.isAuth;
	const showLoginButton =
		(!store.isAuth && !isLoginPage && isReady) || (store.isGuest && !isLoginPage);

	return (
		<div className={styles.backgroundWrap}>
			<div className={clsx("container", styles.nav)}>
				{showExitButton && (
					<Button variant="primary" onClick={logout}>
						exit
					</Button>
				)}

				{showLoginButton && (
					<Button variant="primary" onClick={logout}>
						login
					</Button>
				)}
				<div className={styles.links}>
					<Link className={styles.link} to={RoutePath.ABOUT}>
						about
					</Link>
					<Link className={styles.link} to={RoutePath.POSTS}>
						posts
					</Link>
				</div>
			</div>
		</div>
	);
}

export default observer(Navbar);
