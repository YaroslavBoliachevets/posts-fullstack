import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../button/MyButton";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

import styles from "./Navbar.module.css";

function Navbar() {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	const logout = () => {
		store.logout();
		navigate("/login");
	};
	return (
		<div className="background-wrap">
			<div className={`container ${styles.nav}`}>
				{store.isAuth ? (
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

export default observer(Navbar);
