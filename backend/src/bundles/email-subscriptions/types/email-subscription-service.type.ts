interface IEmailSubscriptionService {
    subscribe(userId: string): Promise<void>;
    unsubscribe(id: string): Promise<void>;
}

export { type IEmailSubscriptionService };
