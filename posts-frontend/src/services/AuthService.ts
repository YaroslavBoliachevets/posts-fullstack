import { $api } from "../API/axios";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const AuthService = {
	login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>("/api/user/login", { email, password });
	},

	registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>("/api/user/registration", { email, password });
	},

	logout(): Promise<void> {
		return $api.post("api/user/logout");
	},
};
