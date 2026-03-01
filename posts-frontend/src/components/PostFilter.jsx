import React from "react";
import Select from "./UI/select/Select";
import Input from "./UI/input/Input";

const PostFilter = ({ filter, setFilter, className }) => {
	return (
		<div className={className}>
			<Input
				placeholder={"search..."}
				value={filter.query}
				onChange={(e) => setFilter({ ...filter, query: e.target.value })}
			/>

			<Select
				value={filter.sort}
				onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
				defaultValue={"sort"}
				options={[
					{ value: "default", name: "default" },
					{ value: "title", name: "by name" },
					{ value: "body", name: "by content" },
				]}
			/>
		</div>
	);
};

export default PostFilter;
