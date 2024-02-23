import { Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

class IndustriesModel extends Model {
    public 'id': number;

    public 'industry': string;

    public static get tableName(): typeof DatabaseTableName.INDUSTRIES {
        return DatabaseTableName.INDUSTRIES;
    }
}

export { IndustriesModel };
