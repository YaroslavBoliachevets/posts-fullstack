import "dotenv/config";
import prisma from "./prisma/client";
import express from "express";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
//чтобы парсить json формат
app.use(express.json());

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
