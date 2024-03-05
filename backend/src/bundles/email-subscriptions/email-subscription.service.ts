import { HttpCode, HttpError } from '~/common/http/http.js';

import { type UserRepository } from '../users/user.repository.js';
import { type UserWithRelations } from '../users/users.js';
import { EmailSubscriptionsValidationMessage } from './enums/enums.js';
import { type IEmailSubscriptionRepository } from './types/email-subscription-repository.type.js';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type.js';
import { type EmailSubscription } from './types/types.js';

class EmailSubscriptionService implements IEmailSubscriptionService {
    public constructor(
        private emailSubscriptionRepository: IEmailSubscriptionRepository,
        private userRepository: UserRepository,
    ) {}

    public async subscribe(
        user: UserWithRelations,
    ): Promise<EmailSubscription> {
        if (user.emailSubscription !== null) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: EmailSubscriptionsValidationMessage.ALREADY_SUBSCRIBED,
            });
        }

        const transaction = await this.userRepository.model.startTransaction();

        try {
            const subscription = await this.emailSubscriptionRepository.create(
                transaction,
            );
            void (await this.userRepository.updateEmailSubscriptionId(
                user.id,
                subscription.id,
                transaction,
            ));

            await transaction.commit();
            return subscription;
        } catch (error: unknown) {
            await transaction.rollback();
            const { message } = error as HttpError;
            throw new HttpError({
                status: HttpCode.INTERNAL_SERVER_ERROR,
                message,
            });
        }
    }

    public async unsubscribe(id: string): Promise<void> {
        await this.emailSubscriptionRepository.delete({ id });
    }
}

export { EmailSubscriptionService };
