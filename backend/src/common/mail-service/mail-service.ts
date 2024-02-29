import { MailService } from './mail-service.package';

const mailService = MailService.getInstance();

export { mailService };
export { type IMailService } from './interfaces/interfaces';
