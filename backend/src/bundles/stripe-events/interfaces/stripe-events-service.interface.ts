import { type StripeEventsResponseDto } from '../types/types.js';

interface IStripeEventsService {
    handleEvent: (
        rawBody: string,
        signature: string,
    ) => Promise<StripeEventsResponseDto>;
}

export { type IStripeEventsService };
