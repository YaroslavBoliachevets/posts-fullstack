import React from "react";
import styles from "./PostTags.module.css";

interface IPostTags {
	tags?: string[];
}

export const PostTags = ({ tags }: IPostTags) => {
	if (!tags || tags.length === 0) return null;
	return (
		<div className={styles.container}>
			{tags.map((tag) => (
				<span key={tag} className={styles.tag}>
					#{tag}
				</span>
			))}
		</div>
	);
};
