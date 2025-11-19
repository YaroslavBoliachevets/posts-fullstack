import React from "react";
import MyButton from "./UI/button/MyButton";
import { motion, AnimatePresence } from "motion/react";

const PostItem = function (props) {
	const { title, body } = props.post;
	const { number, remove } = props;

	return (
			<motion.div
				className="post"
				initial={{ transform: "translateX(-300px)" }}
				animate={{ transform: "translateX(0px)" }}
				exit={{transform: "translateX(100px)", opacity: 0}}
				transition={{
					default: { type: "spring", duration: 1 },
				}}
        key={props.post.id}
			>
				<div className="post__content">
					<strong>
						{number} {title}
					</strong>
					<div>{body}</div>
				</div>
				<div className="post__btns">
					<MyButton onClick={() => remove(props.post)}>Удалить</MyButton>
				</div>
			</motion.div>
	);
};

export default PostItem;
