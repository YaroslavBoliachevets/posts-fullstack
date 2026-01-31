import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import express from "express";
const cors = require("cors");

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
//чтобы парсить json формат
app.use(express.json());

const router = require("./routes/index");
app.use("/api", router);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await prisma.$connect();
		console.log("connected to db");

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error: any) {}
};

start();
