import { type ClientRateLimitInfo, type Store } from 'express-rate-limit';

import { RetrySettings } from '~/common/rate-limit/enums/enums.js';

type Client = {
    totalHits: number;
    resetTime: Date;
};

class MemoryStore implements Store {
    public windowMs!: number;
    public previous = new Map<string, Client>();
    public current = new Map<string, Client>();
    public interval?: NodeJS.Timeout;
    public localKeys = true;

    public init(): void {
        this.windowMs = RetrySettings.TIMEOUT;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.clearExpired();
        }, this.windowMs);

        this.interval.unref();
    }

    public get(key: string): ClientRateLimitInfo | undefined {
        return this.current.get(key) ?? this.previous.get(key);
    }

    public increment(key: string): ClientRateLimitInfo {
        const client = this.getClient(key);

        const now = Date.now();
        if (client.resetTime.getTime() <= now) {
            this.resetClient(client, now);
        }

        client.totalHits++;
        return client;
    }

    public decrement(key: string): void {
        const client = this.getClient(key);

        if (client.totalHits > 0) {
            client.totalHits--;
        }
    }

    public resetKey(key: string): void {
        this.current.delete(key);
        this.previous.delete(key);
    }

    public reset(): void {
        this.current.clear();
        this.previous.clear();
    }

    private resetClient(client: Client, now = Date.now()): Client {
        client.totalHits = 0;
        client.resetTime.setTime(now + this.windowMs);

        return client;
    }

    private getClient(key: string): Client {
        if (this.current.has(key)) {
            return this.current.get(key) as NonNullable<Client>;
        }

        let client;
        if (this.previous.has(key)) {
            client = this.previous.get(key) as NonNullable<Client>;
            this.previous.delete(key);
        } else {
            client = { totalHits: 0, resetTime: new Date() };
            this.resetClient(client);
        }
        this.current.set(key, client);
        return client;
    }

    private clearExpired(): void {
        this.previous = this.current;
        this.current = new Map();
    }
}

export { MemoryStore };
