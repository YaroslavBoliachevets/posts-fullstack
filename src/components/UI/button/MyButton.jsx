import React from "react";
import styles from "./MyButton.module.css";
import clsx from "clsx";

function MyButton({
	children,
	variant = "primary",
	disabled = false,
	className = "",
	...props
}) {
	return (
		<button
			className={clsx(
				styles.button,
				styles[variant],
				disabled && styles.disabled,
				className,
			)}
			styles={styles}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}

export default MyButton;
