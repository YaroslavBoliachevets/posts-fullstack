import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, ...props }: InputProps) {
	return <input className={clsx(styles.input, className)} {...props} />;
}

export default Input;
