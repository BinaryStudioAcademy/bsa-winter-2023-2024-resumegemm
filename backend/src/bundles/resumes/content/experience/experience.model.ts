import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ExperienceModel extends AbstractModel {
    public 'resumeId': string;
    public 'jobTitle': string;
    public 'employer': string;
    public 'employmentType': string;
    public 'startDate': string;
    public 'endDate': string;

    public static override get tableName(): typeof DatabaseTableName.EXPERIENCE {
        return DatabaseTableName.EXPERIENCE;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExperienceModel,
                join: {
                    from: `${DatabaseTableName.EXPERIENCE}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { ExperienceModel };