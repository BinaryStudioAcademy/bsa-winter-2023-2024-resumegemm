interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;

    getById(id: string): Promise<T>;

    findByEmail(email: string): Promise<T>;

    getUserWithProfile(id: string): Promise<T>;

    create(payload: T): Promise<T>;
}

export { type IService };
