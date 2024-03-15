interface IEventHandler<T> {
    handle(data: T): Promise<void>;
}

export { type IEventHandler };
