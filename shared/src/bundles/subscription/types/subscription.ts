type Subscription = {
    id: string;
    status: string;
    isCancelled: boolean;
    subscriptionId: string;
    subscriptionPlanId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    createdAt: string;
    updatedAt: string;
};

export { type Subscription };
