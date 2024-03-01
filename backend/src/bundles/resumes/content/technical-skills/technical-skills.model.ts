import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class TechnicalSkillModel extends AbstractModel {
    public 'name': string;
    public 'level': string;
    public 'resumeId': string;

    public static override get tableName(): typeof DatabaseTableName.TECHNICAL_SKILLS {
        return DatabaseTableName.TECHNICAL_SKILLS;
    }
}

export { TechnicalSkillModel };
