import nodemailer, { type SendMailOptions, type Transporter } from 'nodemailer';
import { type Options } from 'nodemailer/lib/smtp-transport';

import { type IMailService } from './interfaces/interfaces';

class MailService implements IMailService {
    private static instance: MailService;
    private transporter: Transporter;

    private constructor() {
        const transportOptions: Options = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        };

        this.transporter = nodemailer.createTransport(transportOptions);
    }

    public static getInstance(): MailService {
        MailService.instance = new MailService();

        return MailService.instance;
    }

    public async sendMail({
        to,
        subject,
        text = '',
        html = '',
    }: SendMailOptions): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
        });
    }
}

export { MailService };
