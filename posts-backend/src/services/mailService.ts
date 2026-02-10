const nodemailer = require("nodemailer");

class mailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_HOST,
			to,
			subject: "account activision on " + process.env.API_URL,
			text: "",
			html: `
			<div>
			<h1>To activate follow the link</h1>
			<a href=${link}>${link}</a>
			</div>`,
		});
	}
}

export default new mailService();
