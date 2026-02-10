export default class ApiError extends Error {
	public status: number;

	constructor(status: number, message: string) {
		// в error есть дефолтный message, устанавливаем тут
		super(message);
		this.status = status;
	}
	// статические функции которые можно вызывать без создания обьекта / обращаемся на прямую к классу и вызываем ту или другую ф-ю
	static badRequest(message: string) {
		return new ApiError(404, message);
	}

	static internal(message: string) {
		return new ApiError(500, message);
	}

	static forbidden(message: string) {
		return new ApiError(403, message);
	}
	static unauthorisedError() {
		return new ApiError(401, "user is not authorized");
	}
}
