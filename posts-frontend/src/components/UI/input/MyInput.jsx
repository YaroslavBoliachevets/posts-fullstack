import React from "react";
import styles from "./MyInput.module.css";
import clsx from "clsx";

function MyInput({ className, ...props }) {
	return <input className={clsx(styles.input, className)} {...props} />;
}

export default MyInput;
