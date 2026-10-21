import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Error.module.css";

function Error() {
	const navigate = useNavigate();

	return (
		<div className={styles.errorContainer}>
			<div className={styles.errorCard}>
				<h1 className={styles.errorCode}>404</h1>
				<h2 className={styles.errorTitle}>Page Not Found</h2>
				<p className={styles.errorMessage}>
					Oops! It looks like you followed a broken link or the page has been moved.
					Let's get you back to reading, shall we?
				</p>
				<button className={styles.errorBtn} onClick={() => navigate("/posts")}>
					Back to posts
				</button>
			</div>
		</div>
	);
}

export default Error;
