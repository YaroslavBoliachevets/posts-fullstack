import "dotenv/config";
import prisma from "./prisma/client";
import express from "express";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware";
import cors from "cors";
// const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// CORS
const allowedOrigins = [
	"https://posts-fullstack-c9b7.onrender.com",
	"https://posts-fullstack.onrender.com",
	"https://localhost:5173",
	"http://localhost:5173",
	"http://localhost:7000",
	// process.env.CLIENT_URL,
];

// работает, но заменил
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// проверяю как работает
app.use(
	cors({
		credentials: true,
		origin: (origin, callback) => {
			if (!origin) return callback(null, true); // для Postman
			if (allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error("Not allowed by CORS"));
		},
	}),
);

//чтобы парсить json формат
app.use(express.json());
app.use(cookieParser());

// ОБЯЗАТЕЛЬНО — до роутов
// app.options("*", cors());

// роуты
const router = require("./routes/index");
app.use("/api", router);

// ErrorHandler должен быть в конце чтобы обрабатывать все ошибки, после него работа прекращается/возвращается ответ клиенту
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		// console.log(prisma, "prisma");
		await prisma.$connect();
		console.log("connected to db");

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error: any) {}
};

start();
