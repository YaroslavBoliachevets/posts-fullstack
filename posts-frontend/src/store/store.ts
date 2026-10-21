import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/AuthService";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
	user: IUser | null = null;
	isAuth = false;
	isLoading = true;
	isGuest = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	setAuth(bool: boolean) {
		this.isAuth = bool;
		this.setIsLoading(false);
	}

	setUser(user: IUser | null) {
		this.user = user;
		this.setIsLoading(false);
	}

	setIsLoading(value: boolean) {
		this.isLoading = value;
	}

	setGuest(value: boolean) {
		this.isGuest = value;
		this.setIsLoading(false);
	}

	async login(email: string, password: string) {
		try {
			this.isGuest = false;
			localStorage.removeItem("guest");

			this.setIsLoading(true);
			const response = await AuthService.login(email, password);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log("Store login error:", e.response?.data?.message || e.message);
			}
			throw e;
		} finally {
			this.setIsLoading(false);
		}
	}

	async registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		try {
			this.setIsLoading(true);
			localStorage.removeItem("guest");
			const response = await AuthService.registration(email, password);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
			return response;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log(
					"Store registration error:",
					e.response?.data?.message || e.message,
				);
			}

			throw e;
		} finally {
			this.setIsLoading(false);
		}
	}

	async logout(): Promise<AxiosResponse<void>> {
		try {
			this.setIsLoading(true);
			const response = await AuthService.logout();
			localStorage.removeItem("token");
			localStorage.removeItem("guest");
			this.setAuth(false);
			this.setUser(null);
			return response;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log("Store logout error:", e.response?.data?.message || e.message);
			}
			throw e;
		} finally {
			this.setIsLoading(false);
		}
	}

	async checkAuth(): Promise<void> {
		try {
			this.setIsLoading(true);
			const response = await AuthService.refresh();
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log("Store auth error:", e.response?.data?.message || e.message);
			}
			this.setAuth(false);
			localStorage.removeItem("token");
		} finally {
			this.setIsLoading(false);
		}
	}

	async loginGuest() {
		this.setIsLoading(true);
		this.isGuest = true;
		localStorage.setItem("guest", "true");
		this.setIsLoading(false);
	}
}
