import React from "react";
import styles from "./MyInput.module.css";

function MyInput(props) {
	return <input {...props} className={styles.input} />;
}

export default MyInput;
