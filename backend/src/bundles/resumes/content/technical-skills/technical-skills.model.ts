import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class TechnicalSkillModel extends AbstractModel {
    public 'skillName': string;
    public 'skillLevel': string;
    public 'resumeId': string;

    public static override get tableName(): typeof DatabaseTableName.TECHNICAL_SKILLS {
        return DatabaseTableName.TECHNICAL_SKILLS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: TechnicalSkillModel,
                join: {
                    from: `${DatabaseTableName.TECHNICAL_SKILLS}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { TechnicalSkillModel };
