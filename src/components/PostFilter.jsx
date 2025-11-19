import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/myInput";

const PostFilter = ({ filter, setFilter }) => {
	return (
		<div>
			<MyInput
				placeholder={"Поиск..."}
				value={filter.query}
				onChange={(e) => setFilter({ ...filter, query: e.target.value })}
			/>

			<MySelect
				value={filter.sort}
				onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
				defaultValue={"Сортировка"}
				options={[
					{ value: "title", name: "по названию" },
					{ value: "body", name: "по содержанию" },
				]}
			/>
		</div>
	);
};

export default PostFilter;
