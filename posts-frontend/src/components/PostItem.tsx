import React from "react";
import styles from "./PostItem.module.css";
import Button from "./UI/button/Button";
import { motion, AnimatePresence } from "motion/react";
// для создания динамической навигации, каждый пост - своя ссылка
import { useNavigate } from "react-router";
import { Context } from "../main";
import { useContext, useState } from "react";
import clsx from "clsx";
import formatDate from "../utils/formatDate";
import { PostTags } from "./postTags/PostTags";
import { IPost } from "../models/IPost";

interface IPostData {
	number: number;
	key: number;
	post: IPost;
}

const PostItem = function (props: IPostData) {
	const { body, createdAt, id, title, user, _count, tags } = props.post;
	const navigate = useNavigate();

	const { store } = useContext(Context);

	const date = formatDate(createdAt);

	const openPost = () => {
		navigate(`/posts/${id}`);
	};

	return (
		// motion для стилизации появления/удаления просто обертка
		<>
			<motion.div
				className={clsx(
					styles.post,
					user?.email === store.user?.email && styles.myPost,
				)}
				initial={{ transform: "translateX(-300px)" }}
				animate={{ transform: "translateX(0px)" }}
				exit={{ transform: "translateX(100px)", opacity: 0 }}
				transition={{
					default: { type: "spring", duration: 1 },
				}}
				key={props.post.id}
				onClick={() => openPost()}
			>
				<div className={styles.postInfo}>
					<div className={styles.main}>
						<div>
							<h5 className={styles.title}>{title}</h5>
							<p className={styles.body}>{body}</p>
						</div>
						<div className={styles.author}>
							<p className={styles.email}>{date}</p>
							{user?.email === store.user?.email ? (
								<p className={styles.badge}>your post</p>
							) : (
								<p className={styles.email}>{user?.email}</p>
							)}
						</div>
					</div>
				</div>
				<div className={styles.commentsBlock}>
					<PostTags tags={tags} />
					{_count?.comments > 0 ? (
						<span className={styles.comments}>
							total comments:{_count?.comments ?? 0}
						</span>
					) : (
						<span className={styles.comments}>leave a comment</span>
					)}
				</div>
			</motion.div>
		</>
	);
};

export default PostItem;
