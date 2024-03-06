interface IMailService {
    sendMail(parameters: {
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<void>;
}

export { type IMailService };
