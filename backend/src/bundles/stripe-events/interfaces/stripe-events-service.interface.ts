import {
    type StripeEventsRequestDto,
    type StripeEventsResponseDto,
} from '../types/types.js';

interface IStripeEventsService {
    handleEvent: (event: StripeEventsRequestDto) => StripeEventsResponseDto;
}

export { type IStripeEventsService };
