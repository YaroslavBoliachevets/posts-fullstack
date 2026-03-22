import React from "react";
import styles from "./PostItem.module.css";
import Button from "./UI/button/Button";
import { motion, AnimatePresence } from "motion/react";
// для создания динамической навигации, каждый пост - своя ссылка
import { useNavigate } from "react-router";
import { Context } from "../main";
import { useContext, useState } from "react";
import clsx from "clsx";
import Modal from "./UI/modal/Modal";
import PostForm from "./PostForm";
import PostService from "../services/PostService";

const PostItem = function (props) {
	const { title, body, id, user, _count } = props.post;
	const { number, remove, update } = props;
	const navigate = useNavigate();

	const [modal, setModal] = useState(false);

	const { store } = useContext(Context);

	const openPost = (id) => {
		navigate(`/posts/${id}`);
	};

	const openModal = (e) => {
		e.stopPropagation();
		setModal(true);
	};

	const updatePost = async (post) => {
		const response = await PostService.updatePost(post);
		update(post);
		setModal(false);
	};

	return (
		// motion для стилизации появления/удаления просто обертка
		<>
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
							onClick={(e) => {
								openModal(e);
							}}
							disabled={store.isGuest || store.user?.email != user?.email}
						>
							update
						</Button>

						<Button
							onClick={(e) => {
								e.stopPropagation();
								remove(props.post);
							}}
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
			<Modal visible={modal} setVisible={setModal}>
				<PostForm
					buttonName={"update post"}
					change={updatePost}
					formPost={props.post}
				/>
			</Modal>
		</>
	);
};

export default PostItem;
