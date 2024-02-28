import { type RelationMappings, Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class CertificationModel extends AbstractModel {
    public 'resumeId': string;
    public 'certificationName': string;
    public 'authority': string;
    public 'startDate': string;
    public 'endDate': string;
    public 'certificationUrlOrCode': string;
    public 'description': string;

    public static override get tableName(): typeof DatabaseTableName.CERTIFICATION {
        return DatabaseTableName.CERTIFICATION;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.CERTIFICATION}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { CertificationModel };
