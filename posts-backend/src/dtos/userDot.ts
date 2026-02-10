// data transfer obj нужно чтобы передать часть данных из обьекта, скрытьс нежелательное, типа не передать пароли или активейшн линк, роль например.
// Дальше, если структура в базе изменится то мы будем гарантированно получать то что нужно фронту и он не будет ломаться
// Мы отделяем доменную модель от транспортной, можно тут переименовать поля как захочешь и отправлять клиенту
// в нашем случае посмотреть схему, на юзере много инфе, а передаем только 3 поля
class UserDto {
	email;
	id;
	isActivated;

	constructor(model: { email: string; id: number; isActivated: boolean }) {
		this.email = model.email;
		this.id = model.id;
		this.isActivated = model.isActivated;
	}
}

export default UserDto;
