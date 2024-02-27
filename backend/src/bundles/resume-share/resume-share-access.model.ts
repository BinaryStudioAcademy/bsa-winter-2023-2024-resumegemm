import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ResumeShareModel } from './resume-share.model.js';

class ResumeShareAccessModel extends AbstractModel {
    public 'resumeShareLinkId': string;

    public 'time': string;

    public 'accessTime': Date;

    public 'resumeShareAccessIp': string;

    public static override get tableName(): typeof DatabaseTableName.RESUME_SHARE_ACCESS {
        return DatabaseTableName.RESUME_SHARE_ACCESS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resumes: {
                relation: Model.HasOneRelation,
                modelClass: ResumeShareModel,
                join: {
                    from: `${DatabaseTableName.RESUME_SHARE_ACCESS}.resumeShareId`,
                    to: `${DatabaseTableName.RESUME_SHARE_LINK}.id`,
                },
            },
        };
    }
}

export { ResumeShareAccessModel };
