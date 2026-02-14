import { $api } from "../API/axios";
import { AxiosResponse } from "axios";
import { AuthResponce } from "../models/responce/AuthResponce";

export const AuthService = {
	login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
		return $api.post<AuthResponce>("/login", { email, password });
	},

	registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponce>> {
		return $api.post<AuthResponce>("/registration", { email, password });
	},

	logout(): Promise<void> {
		return $api.post("/logout");
	},
};
