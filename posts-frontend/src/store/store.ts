import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/AuthService";
import axios from "axios";
import { AuthResponce } from "../models/responce/AuthResponce";

export default class Store {
	user = {} as IUser;
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}
	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	setIsLoading(value: boolean) {
		this.isLoading = value;
	}

	async login(email: string, password: string) {
		try {
			this.setIsLoading(true);
			const responce = await AuthService.login(email, password);
			console.log("store login responce", responce);
			localStorage.setItem("token", responce.data.accessToken);
			this.setAuth(true);
			this.setUser(responce.data.user);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		} finally {
			this.setIsLoading(false);
		}
	}

	async registration(email: string, password: string) {
		try {
			this.setIsLoading(true);
			const responce = await AuthService.registration(email, password);
			console.log("store registration responce", responce);
			localStorage.setItem("token", responce.data.accessToken);
			this.setAuth(true);
			this.setUser(responce.data.user);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		} finally {
			this.setIsLoading(false);
		}
	}

	async logout() {
		try {
			this.setIsLoading(true);
			const responce = await AuthService.logout();
			localStorage.removeItem("token");
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
			const responce = await axios.get<AuthResponce>(
				`${import.meta.env.VITE_API_URL}/api/refresh`,
				{ withCredentials: true },
			);
			console.log("store checkAuth responce", responce);
			localStorage.setItem("token", responce.data.accessToken);
			this.setAuth(true);
			this.setUser(responce.data.user);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		} finally {
			this.setIsLoading(false);
		}
	}
}
