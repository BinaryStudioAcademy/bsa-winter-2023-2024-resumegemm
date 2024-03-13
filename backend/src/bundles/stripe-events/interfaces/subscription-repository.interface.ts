import { type Subscription } from '../types/subscription.type';
import { type SubscriptionCreateDto } from '../types/subscription-create-dto.type';

interface ISubscriptionRepository {
    create(data: SubscriptionCreateDto): Promise<Subscription>;
}

export { type ISubscriptionRepository };
