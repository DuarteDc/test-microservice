import nodemailer from "nodemailer";
import config from "../config/config";

export class EmailService {
    private transporter;
    constructor() {
        console.log(config)
        this.transporter = nodemailer.createTransport({
            host: '10.51.0.215',
            port: 25,
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });
    }

    async sendEmail(to: string, subject: string, content: string) {
        const mailOptions = {
            from: config.EMAIL_FROM,
            to: to,
            subject: subject,
            html: content,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Email sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}