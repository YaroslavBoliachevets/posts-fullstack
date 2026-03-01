import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

function Input({ className, ...props }) {
	return <input className={clsx(styles.input, className)} {...props} />;
}

export default Input;
