import fs from "fs";
import path from "path";

export default {
	server: {
		port: 5173,
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "cert/localhost-key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "cert/localhost.pem")),
		},
	},
};
