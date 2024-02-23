import { type Industry } from './types';

type IIndustriesService = {
    findAll(data: { limit: number }): Promise<Industry[]>;
};

export { type IIndustriesService };
