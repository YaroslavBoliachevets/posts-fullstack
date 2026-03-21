import React from "react";
import styles from "./PostItem.module.css";
import Button from "./UI/button/Button";
import { motion, AnimatePresence } from "motion/react";
// для создания динамической навигации, каждый пост - своя ссылка
import { useNavigate } from "react-router";
import { Context } from "../main";
import { useContext } from "react";
import clsx from "clsx";

const PostItem = function (props) {
	const { title, body, id, user, _count } = props.post;
	const { number, remove } = props;
	const navigate = useNavigate();

	const { store } = useContext(Context);

	const openPost = (id) => {
		navigate(`/posts/${id}`);
	};

	return (
		// motion для стилизации появления/удаления просто обертка
		<motion.div
			className={clsx(
				styles.post,
				user?.email === store.user.email && styles.myPost,
			)}
			initial={{ transform: "translateX(-300px)" }}
			animate={{ transform: "translateX(0px)" }}
			exit={{ transform: "translateX(100px)", opacity: 0 }}
			transition={{
				default: { type: "spring", duration: 1 },
			}}
			key={props.post.id}
			onClick={() => openPost(id)}
		>
			<div className={styles.post1}>
				<div className={styles.main}>
					<div>
						<h5 className={styles.title}>
							{number} {title}
						</h5>
						<p className={styles.body}>{body}</p>
					</div>
					<div className={styles.author}>
						{user?.email === store.user.email ? (
							<span className={styles.badge}>your post</span>
						) : (
							<span className={styles.email}>{user?.email}</span>
						)}
					</div>
				</div>
				<div className={styles.actions}>
					<Button onClick={() => openPost(id)}>open</Button>
					<Button
						onClick={() => remove(props.post)}
						disabled={store.isGuest || store.user?.email != user?.email}
					>
						delete
					</Button>
				</div>
			</div>
			<div className={styles.commentsBlock}>
				{_count?.comments > 0 ? (
					<span className={styles.comments}>
						total comments:{_count?.comments ?? 0}
					</span>
				) : (
					<span className={styles.comments}>leave a comment</span>
				)}
			</div>
		</motion.div>
	);
};

export default PostItem;
