import { MailService } from './mail-service.package.js';

const mailService = MailService.getInstance();

export { mailService };
export { type IMailService } from './interfaces/interfaces';
