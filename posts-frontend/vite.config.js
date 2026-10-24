import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "cert/localhost-key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "cert/localhost.pem")),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.js",
	},
});
