type StripeEventsRequestDto = {
    id: string;
    object: string;
    api_version: string;
    created: number;
    data?: unknown;
    livemode: boolean;
    pending_livehooks: number;
    request: {
        id: string;
        idempotency_key: string;
    };
    type: string;
};

export { type StripeEventsRequestDto };
