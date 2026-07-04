import React from "react";
import Select from "./UI/select/Select";
import Input from "./UI/input/Input";
import { IFilter } from "../pages/Posts/Posts";

interface PostFilterProps {
	filter: IFilter;
	setFilter: (filter: IFilter) => void;
	className?: string;
}

const PostFilter = ({ filter, setFilter, className }: PostFilterProps) => {
	return (
		<div className={className}>
			<Input
				placeholder={"search..."}
				value={filter.query}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setFilter({ ...filter, query: e.target.value })
				}
			/>

			<Select
				value={filter.sort}
				onChange={(selectedSort: string) =>
					setFilter({ ...filter, sort: selectedSort })
				}
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
