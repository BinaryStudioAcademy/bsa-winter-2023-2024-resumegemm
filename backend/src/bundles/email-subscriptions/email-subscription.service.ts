import { type UserService } from '../users/user.service';
import { type IEmailSubscriptionRepository } from './types/email-subscription-repository.type';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type';
import { type EmailSubscription } from './types/types';

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
