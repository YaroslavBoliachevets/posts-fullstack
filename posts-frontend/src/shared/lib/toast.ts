import toast from "react-hot-toast";

export const notifyCommentCreated = () => {
	toast.success("Комментарий опубликован");
};

export const notifyCommentUpdated = () => {
	toast.success("Комментарий обновлен");
};

export const notifyCommentDeleted = () => {
	toast.success("Комментарий удален");
};

export const toastPromise = (
	promise: Promise<void>,
	messages: { loading: string; success: string; error: string },
) => {
	toast.promise(promise, {
		loading: messages.loading,
		success: messages.success,
		error: messages.error,
	});
};

export const COMMENT_MESSAGES = {
	create: {
		loading: "Публикация комментария",
		success: "Комментарий опубликован",
		error: "Ошибка создания",
	},
	update: {
		loading: "Обновление комментария",
		success: "Комментарий обновлен",
		error: "Ошибка обновления",
	},
	delete: {
		loading: "Удаление комментария",
		success: "Комментарий удален",
		error: "Ошибка удаления комментария",
	},
};
