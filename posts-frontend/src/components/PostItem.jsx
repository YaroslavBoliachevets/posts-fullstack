import React from "react";
import styles from "./PostItem.module.css";
import Button from "./UI/button/Button";
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
					{number} {title}
				</h5>
				<p className={styles.body}>{body}</p>
			</div>
			<div className={styles.actions}>
				<Button onClick={() => openPost(id)}>open</Button>
				<Button onClick={() => remove(props.post)}>delete</Button>
			</div>
		</motion.div>
	);
};

export default PostItem;
