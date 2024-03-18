import {
    type SubscriptionResponseDto,
    type SubscriptionWithPlan,
} from '../types/types';
import { formatDate } from './helpers.js';

const formatSubscriptionDate = (
    subscription: SubscriptionWithPlan,
): SubscriptionResponseDto => {
    const { startDate, endDate } = subscription;
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    return { ...subscription, startDate: start, endDate: end };
};

export { formatSubscriptionDate };
