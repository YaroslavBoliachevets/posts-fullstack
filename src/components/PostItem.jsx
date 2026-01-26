import React from "react";
import styles from "./PostItem.module.css";
import MyButton from "./UI/button/MyButton";
import { motion, AnimatePresence } from "motion/react";
// для создания динамической навигации, каждый пост - своя ссылка
import { useNavigate } from "react-router";

const PostItem = function (props) {
	const { title, body, id } = props.post;
	const { number, remove } = props;

	const navigate = useNavigate();

	const openPost = (id) => {
		navigate(`/posts/${id}`);
	};

	return (
		// motion для стилизации появления/удаления просто обертка
		<motion.div
			className={styles.post}
			initial={{ transform: "translateX(-300px)" }}
			animate={{ transform: "translateX(0px)" }}
			exit={{ transform: "translateX(100px)", opacity: 0 }}
			transition={{
				default: { type: "spring", duration: 1 },
			}}
			key={props.post.id}
		>
			<div>
				<h5 className={styles.title}>
					{id} {title}
				</h5>
				<p className={styles.body}>{body}</p>
			</div>
			<div className={styles.actions}>
				<MyButton onClick={() => openPost(id)}>Открыть</MyButton>
				<MyButton onClick={() => remove(props.post)}>Удалить</MyButton>
			</div>
		</motion.div>
	);
};

export default PostItem;
