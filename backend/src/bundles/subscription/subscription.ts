import { SubscriptionModel } from './subscription.model.js';
import { SubscriptionRepository } from './subscription.repository.js';
import { SubscriptionService } from './subscription.service.js';

const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);

const subscriptionService = new SubscriptionService(subscriptionRepository);

export { subscriptionService };
