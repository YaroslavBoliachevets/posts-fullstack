import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
	user = {} as IUser;
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

	setUser(user: IUser) {
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
			// console.log("store login response", response);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			console.log("user", response.data.user);
			this.setUser(response.data.user);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		} finally {
			this.setIsLoading(false);
		}
	}

	async registration(email: string, password: string) {
		try {
			this.setIsLoading(true);
			localStorage.removeItem("guest");
			const response = await AuthService.registration(email, password);
			// console.log("store registration response", response);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
			return response;
		} catch (e: any) {
			console.log(e.response?.data?.message);
			throw e;
		} finally {
			this.setIsLoading(false);
		}
	}

	async logout() {
		try {
			this.setIsLoading(true);
			const response = await AuthService.logout();
			localStorage.removeItem("token");
			localStorage.removeItem("guest");
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		} finally {
			this.setIsLoading(false);
		}
	}

	async checkAuth() {
		try {
			this.setIsLoading(true);
			const response = await axios.get<AuthResponse>(
				`${import.meta.env.VITE_API_URL}/api/user/refresh`,
				{ withCredentials: true },
			);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e: any) {
			console.log(e.response?.data?.message);
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
