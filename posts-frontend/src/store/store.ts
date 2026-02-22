import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/AuthService";

export default class Store {
	user = {} as IUser;
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}
	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	async login(email: string, password: string) {
		try {
			const responce = await AuthService.login(email, password);
			console.log("store login responce", responce);
			localStorage.setItem("token", responce.data.accessToken);
			this.setAuth(true);
			this.setUser(responce.data.user);
		} catch (e: any) {
			console.log(e.responce?.data?.message);
		}
	}

	async registration(email: string, password: string) {
		try {
			const responce = await AuthService.registration(email, password);
			console.log("store registration responce", responce);
			localStorage.setItem("token", responce.data.accessToken);
			this.setAuth(true);
			this.setUser(responce.data.user);
		} catch (e: any) {
			console.log(e.responce?.data?.message);
		}
	}

	async logout() {
		try {
			const responce = await AuthService.logout();
			localStorage.removeItem("token");
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (e: any) {
			console.log(e.responce?.data?.message);
		}
	}

	async checkAuth() {
		try {
		} catch (e: any) {
			console.log(e.responce?.data?.message);
		}
	}
}
