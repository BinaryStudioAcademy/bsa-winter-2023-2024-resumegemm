interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;

    findByEmail(email: string): Promise<T>;

    getUserWithProfile(id: string): Promise<T>;

    create(payload: T): Promise<T>;
}

export { type IService };
