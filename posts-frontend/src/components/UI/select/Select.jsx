import React from "react";
import clsx from "clsx";
import styles from "./Select.module.css";

function Select({
	options,
	defaultValue,
	value,
	onChange,
	className,
	...porps
}) {
	return (
		<select
			className={clsx(styles.select, className)}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			<option disabled>{defaultValue}</option>
			{options.map((option) => {
				return (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				);
			})}
		</select>
	);
}

export default Select;
