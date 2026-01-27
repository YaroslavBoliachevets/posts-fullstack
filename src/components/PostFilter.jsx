import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/myInput";

const PostFilter = ({ filter, setFilter, className }) => {
	return (
		<div className={className}>
			<MyInput
				placeholder={"search..."}
				value={filter.query}
				onChange={(e) => setFilter({ ...filter, query: e.target.value })}
			/>

			<MySelect
				value={filter.sort}
				onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
				defaultValue={"sort"}
				options={[
					{ value: "title", name: "by name" },
					{ value: "body", name: "by content" },
				]}
			/>
		</div>
	);
};

export default PostFilter;
