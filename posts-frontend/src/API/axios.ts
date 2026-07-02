import axios, { InternalAxiosRequestConfig } from "axios";
// import AxiosRequestConfig

export const $api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/",
	withCredentials: true, // важно для refreshToken cookie, к каждому запросу цепляем куки автоматически
});

// нет защиты аксесс токена от XSS, нужно перенести хранение из локалсторидж в мобикс
// config - все из чего состоит шттп запро. мы перехватываем запрос до того как он уйдет в сеть и пришиваем аксесс токе (если есть). нужен чтобы в каждом запросе не писать это вручную
$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("token");
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
