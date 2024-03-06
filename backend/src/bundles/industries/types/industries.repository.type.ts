import { type Industry } from './types';

interface IIndustriesRepository {
    findAll: () => Promise<Industry[]>;
}

export { type IIndustriesRepository };
