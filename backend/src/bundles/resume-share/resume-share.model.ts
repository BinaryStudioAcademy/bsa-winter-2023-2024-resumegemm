import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ResumeModel } from '../resumes/resume.model.js';

class ResumeShareModel extends AbstractModel {
    public 'resumeId': string;

    public static override get tableName(): typeof DatabaseTableName.RESUME_SHARE_LINK {
        return DatabaseTableName.RESUME_SHARE_LINK;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resumes: {
                relation: Model.HasOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.RESUME_SHARE_LINK}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { ResumeShareModel };
