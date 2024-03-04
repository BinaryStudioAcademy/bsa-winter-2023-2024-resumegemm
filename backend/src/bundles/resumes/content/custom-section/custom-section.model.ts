import { type RelationMappings, Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class CustomSectionModel extends AbstractModel {
    public 'resumeId': string;
    public 'activity': string;
    public 'city': string;
    public 'description': string;
    public 'startDate': string;
    public 'endDate': string;

    public static override get tableName(): typeof DatabaseTableName.CUSTOM_SECTIONS {
        return DatabaseTableName.CUSTOM_SECTIONS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.CUSTOM_SECTIONS}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { CustomSectionModel };
