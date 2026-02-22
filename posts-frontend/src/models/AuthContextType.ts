import React from "react";
import { createContext } from "react";

// задаю типы чтобы в app не регался тайп скрипт так как добавил value
export interface AuthContextType {
	isAuth: boolean;
	isLoading: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
