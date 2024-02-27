import { HttpCode, HttpError } from '~/common/http/http.js';

import { type UserRepository } from '../users/user.repository.js';
import { type IEmailSubscriptionRepository } from './types/email-subscription-repository.type.js';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type.js';
import { type EmailSubscription } from './types/types.js';

class EmailSubscriptionService implements IEmailSubscriptionService {
    public constructor(
        private emailSubscriptionRepository: IEmailSubscriptionRepository,
        private userRepository: UserRepository,
    ) {}

    public async subscribe(userId: string): Promise<EmailSubscription> {
        const transaction = await this.userRepository.model.startTransaction();

        try {
            const subscriprion = await this.emailSubscriptionRepository.create(
                transaction,
            );
            void (await this.userRepository.updateEmailSubscriptionId(
                userId,
                subscriprion.id,
                transaction,
            ));

            await transaction.commit();
            return subscriprion;
        } catch {
            await transaction.rollback();
            throw new HttpError({
                status: HttpCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
            });
        }
    }

    public async unsubscribe(id: string): Promise<void> {
        await this.emailSubscriptionRepository.delete({ id });
    }
}

export { EmailSubscriptionService };
