// import { path } from "motion/react-client";
import React from "react";

import About from "../pages/About";
import Posts from "../pages/Posts/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage/PostIdPage";
import Login from "../pages/Login/Login";

// централизованное хранение путей / Enumeration
export enum RoutePath {
	ABOUT = "/about",
	POSTS = "/posts",
	POST_DETAIL = "/posts/:id",
	LOGIN = "/login",
	ERROR = "/error",
}

export interface IRoute {
	path: RoutePath | string;
	element: React.ReactNode;
}

export const privateRoutes: IRoute[] = [
	{ path: RoutePath.ABOUT, element: <About /> },
	{ path: RoutePath.POSTS, element: <Posts /> },
	// динамический роут
	{
		path: RoutePath.POST_DETAIL,
		element: <PostIdPage />,
	},
	{ path: RoutePath.ERROR, element: <Error /> },
];

export const publicRoutes: IRoute[] = [
	{ path: RoutePath.ABOUT, element: <About /> },
	{
		path: RoutePath.LOGIN,
		element: <Login />,
	},
];
