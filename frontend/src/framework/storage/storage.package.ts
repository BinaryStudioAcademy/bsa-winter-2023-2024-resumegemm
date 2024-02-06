import { type ValueOf } from '~/bundles/common/types/types.js';

import { type StorageKey } from './enums/enums.js';
import { type IStorage } from './interfaces/interfaces.js';

class Storage implements IStorage {
    private store: globalThis.Storage;

    public constructor(store: globalThis.Storage) {
        this.store = store;
    }

    public set(key: ValueOf<typeof StorageKey>, value: string): Promise<void> {
        this.store.setItem(key as string, value);

        return Promise.resolve();
    }

    public get<R = string>(key: ValueOf<typeof StorageKey>): Promise<R | null> {
        return Promise.resolve(this.store.getItem(key as string) as R);
    }

    public drop(key: ValueOf<typeof StorageKey>): Promise<void> {
        this.store.removeItem(key as string);

        return Promise.resolve();
    }

    public async has(key: ValueOf<typeof StorageKey>): Promise<boolean> {
        const value = await this.get(key);

        return Boolean(value);
    }
}

export { Storage };
