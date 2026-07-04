import React from "react";
import clsx from "clsx";
import styles from "./Select.module.css";

// <T> — это дженерик (тип-хамелеон). Мы добавляем его, так как value может быть
// строкой (в фильтрах: "title") или числом (в пагинации: 5) в зависимости от места импорта.
// Ограничение `extends string | number` защищает от передачи некорректных типов (например, объектов).
interface SelectOption<T extends string | number> {
	value: T;
	name: string;
}

// Пропсы тоже делаем дженериком <T>, чтобы прокинуть этот тип внутрь SelectOption, value и onChange.
// Omit здесь критически важен: мы «вырезаем» стандартные свойства "onChange" и "value" из HTML-селекта,
// потому что по стандарту они умеют работать только со строками, а нам нужен наш гибкий тип T.
interface SelectProps<T extends string | number> extends Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"onChange" | "value"
> {
	options: SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
}

// Так как сама функция изначально ничего не знает о T, мы объявляем её как дженерик: <T...>.
// Теперь при вызове <Select /> TypeScript сам посмотрит на переданные пропсы и поймет, чем является T.
function Select<T extends string | number>({
	options,
	defaultValue,
	value,
	onChange,
	className,
	...props
}: SelectProps<T>) {
	return (
		<select
			{...props}
			className={clsx(styles.select, className)}
			value={value}
			onChange={(e) => {
				// Ищем в массиве опций ту, которую выбрал пользователь
				// Трюк: браузер в e.target.value ВСЕГДА возвращает строку (например, число 5 превратится в "5").
				// Чтобы поиск сработал для любого типа, мы временно приводим option.value к строке String() и сравниваем.
				const selectedOption = options.find(
					(option) => String(option.value) === e.target.value,
				);
				// Когда нашли нужную опцию — берем её оригинальное значение из массива options
				// (где число осталось числом, а строка строкой) и отдаем её НАСТОЯЩИЙ тип T наружу.
				if (selectedOption) {
					onChange(selectedOption.value);
				}
			}}
		>
			<option disabled value="">
				{defaultValue}
			</option>
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
