import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

// расширяю через ButtonHTMLAttributes чтобы можно было использовать props обычной кнопки
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: string;
	disabled?: boolean;
	className?: string;
}

function Button({
	children,
	variant = "primary",
	disabled = false,
	className = "",
	...props
}: IButton) {
	return (
		<button
			className={clsx(
				styles.button,
				styles[variant],
				disabled && styles.disabled,
				className,
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
