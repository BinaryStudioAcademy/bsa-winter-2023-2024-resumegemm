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
        const items = await this.userService.findAll();
        const users = items.items;

        const recentlyViewedWithCountAndUser =
            await this.recentlyViewedService.findRecentlyViewedResumesWithCount();

        for (const user of users) {
            const email = user.email;
            let resumeCount = 0;

            const userData = recentlyViewedWithCountAndUser.find(
                (data) => data.userId === user.id,
            );

            if (userData) {
                resumeCount = userData.count;
            }
            await this.sendMail({
                to: email,
                subject: 'Resume Views Notification',
                text: `Your resume was viewed ${resumeCount} times today.`,
            });
        }
    }
}

export { ResumeCountEmailService };
