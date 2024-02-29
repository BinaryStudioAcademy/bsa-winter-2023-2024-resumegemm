import { type StripeEventsResponseDto } from '../types/types.js';

interface IStripeEventsService {
    handleEvent: (
        rawBody: string,
        signature: string,
    ) => StripeEventsResponseDto;
}

export { type IStripeEventsService };
