type SubscriptionDetails = {
    email: string;
    subject: string;
    name: string;
    start: number;
    end: number;
    items?: { description: string }[];
    description: string | null;
};

export { type SubscriptionDetails };
