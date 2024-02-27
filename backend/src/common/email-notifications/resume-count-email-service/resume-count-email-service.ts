import { type RecentlyViewedService } from '~/bundles/recently-viewed/recently-viewed.service.js';
import { type UserService } from '~/bundles/users/user.service.js';

import { MailService } from '../../mail-service/mail-service.package.js';

class ResumeCountEmailService extends MailService {
    private recentlyViewedService: RecentlyViewedService;
    private userService: UserService;

    public constructor(
        recentlyViewedService: RecentlyViewedService,
        userService: UserService,
    ) {
        super();
        this.recentlyViewedService = recentlyViewedService;
        this.userService = userService;
    }

    public async sendEmails(): Promise<void> {
        const users = await this.userService.findAll();
        const items =
            await this.recentlyViewedService.findRecentlyViewedResumesWithCount();

        for (const item of items) {
            const user = users.items.find((user) => user.id === item.userId);
            const userEmail = user?.email;
            const resumeCount = item.count;

            await this.sendMail({
                to: userEmail,
                subject: 'Resume Views Notification',
                text: `Your resume was viewed ${resumeCount} times today.`,
            });
        }
    }
}

export { ResumeCountEmailService };
