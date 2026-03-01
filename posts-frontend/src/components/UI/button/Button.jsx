import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function Button({
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

export default Button;
