import React from "react";
import classes from "./Modal.module.css";
import { motion, AnimatePresence } from "motion/react";

interface IModal {
	children: React.ReactNode;
	visible: boolean;
	setVisible: (state: boolean) => void;
}

function Modal({ children, visible, setVisible }: IModal) {
	return (
		<AnimatePresence initial={false}>
			{visible && (
				<motion.div
					className={classes.modal}
					onClick={() => setVisible(false)}
					key="backdrop"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ default: { duration: 0.5 } }}
				>
					<motion.div
						className={classes.modalContent}
						onClick={(e) => e.stopPropagation()}
						key="modal"
						initial={{ opacity: 0, transform: "translateX(-300px)" }}
						animate={{ opacity: 1, transform: "translateX(0px)" }}
						exit={{ opacity: 0, transform: "translateX(300px)" }}
						transition={{ default: { ease: "linear", duration: 0.3 } }}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default Modal;
