import { type RelationMappings, Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class EducationModel extends AbstractModel {
    public 'resumeId': string;
    public 'majorName': string;
    public 'degree': string;
    public 'startDate': string;
    public 'endDate': string;

    public static override get tableName(): typeof DatabaseTableName.EDUCATION {
        return DatabaseTableName.EDUCATION;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.EDUCATION}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { EducationModel };
