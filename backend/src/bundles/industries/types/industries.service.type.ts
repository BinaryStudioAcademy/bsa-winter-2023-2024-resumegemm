import { type Industry } from './types';

interface IIndustriesService {
    findAll(data: { limit: number }): Promise<Industry[]>;
}

export { type IIndustriesService };
