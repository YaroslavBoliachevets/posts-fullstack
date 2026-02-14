import axios from "axios";
// import AxiosRequestConfig

export const $api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true, // важно для refreshToken cookie, к каждому запросу цепляем куки автоматически
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});
