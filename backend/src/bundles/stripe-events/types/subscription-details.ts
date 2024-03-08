type SubscriptionDetails = {
    email: string;
    subject: string;
    name: string;
    current_period_start: number;
    current_period_end: number;
    description?: string | null;
};

export { type SubscriptionDetails };
