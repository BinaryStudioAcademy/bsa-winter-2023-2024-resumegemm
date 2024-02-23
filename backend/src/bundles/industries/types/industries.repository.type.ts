import { type Industry } from './types';

type IIndustriesRepository = {
    findAll: () => Promise<Industry[]>;
};

export { type IIndustriesRepository };
