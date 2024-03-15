type SubscriptionDetails = {
    email: string;
    subject: string;
    name: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    description?: string | null;
};

export { type SubscriptionDetails };
