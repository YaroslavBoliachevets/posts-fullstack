// import { path } from "motion/react-client";
import React from "react";

import About from "../pages/About.jsx";
import Posts from "../pages/Posts/Posts.jsx";
import Error from "../pages/Error.jsx";
import PostIdPage from "../pages/PostIdPage/PostIdPage.jsx";
import Login from "../pages/Login/Login.jsx";

export const privateRoutes = [
	{ path: "/about", element: <About /> },
	{ path: "/posts", element: <Posts /> },
	// динамический роут
	{
		path: "/posts/:id",
		element: <PostIdPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{ path: "/error", element: <Error /> },
	// перенаправляет все неправильные пути на страницу с постами
	{ path: "*", element: <Posts /> },
];

export const publicRoutes = [
	{ path: "/about", element: <About /> },
	{
		path: "*",
		element: <Login />,
	},
];
