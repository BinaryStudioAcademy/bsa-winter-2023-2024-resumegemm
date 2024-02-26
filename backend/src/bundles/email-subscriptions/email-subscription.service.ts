import { type UserService } from '../users/user.service.js';
import { type IEmailSubscriptionRepository } from './types/email-subscription-repository.type.js';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type.js';
import { type EmailSubscription } from './types/types.js';

class EmailSubscriptionService implements IEmailSubscriptionService {
    public constructor(
        private emailSubscriptionRepository: IEmailSubscriptionRepository,
        private userService: UserService,
    ) {}

    public async subscribe(userId: string): Promise<EmailSubscription> {
        const subscriprion = await this.emailSubscriptionRepository.create();
        await this.userService.updateEmailSubscription(userId, subscriprion.id);
        return subscriprion;
    }

    public async unsubscribe(id: string): Promise<void> {
        await this.emailSubscriptionRepository.delete({ id });
    }
}

export { EmailSubscriptionService };
