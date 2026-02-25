import "dotenv/config";
import prisma from "./prisma/client";
import express from "express";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware";

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:7000",
	process.env.CLIENT_URL,
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// и добавляем заголовок вручную вдруг експресс что-то не понравится
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

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
