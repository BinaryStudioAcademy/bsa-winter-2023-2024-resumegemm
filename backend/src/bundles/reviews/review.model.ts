import { type RelationMappings,Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes';
import { AbstractModel, DatabaseTableName } from '~/common/database/database';

class ReviewModel extends AbstractModel {
    public 'resumeId': number;
    public 'score': number;
    public 'content': string;

    public static override get tableName(): typeof DatabaseTableName.REVIEWS {
        return DatabaseTableName.REVIEWS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resumes: {
                relation: Model.HasOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.REVIEWS}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { ReviewModel };
