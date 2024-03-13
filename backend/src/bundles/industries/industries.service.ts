import { type IndustriesRepository } from './industries.repository';
import { type IIndustriesService, type Industry } from './types/types';

class IndustriesService implements IIndustriesService {
    private industriesRepository: IndustriesRepository;

    public constructor(industriesRepository: IndustriesRepository) {
        this.industriesRepository = industriesRepository;
    }

    public async findAll(): Promise<Industry[]> {
        return await this.industriesRepository.findAll();
    }
}

export { IndustriesService };
