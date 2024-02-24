interface IRepository<T = unknown> {
    find(): Promise<T>;

    findAll(): Promise<T[]>;

    findOneByEmail(email: string): Promise<T>;

    create(payload?: T): Promise<T>;

    update(): Promise<T>;

    getUserWithProfile(id: string): Promise<T>;

    delete(): Promise<boolean>;
}

export { type IRepository };
