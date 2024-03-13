import { type IndustriesModel } from './industries.model';
import { type IIndustriesRepository, type Industry } from './types/types';

class IndustriesRepository implements IIndustriesRepository {
    private industriesModel: typeof IndustriesModel;

    public constructor(industriesModel: typeof IndustriesModel) {
        this.industriesModel = industriesModel;
    }

    public async findAll(): Promise<Industry[]> {
        return await this.industriesModel.query().orderBy('industry');
    }
}

export { IndustriesRepository };
