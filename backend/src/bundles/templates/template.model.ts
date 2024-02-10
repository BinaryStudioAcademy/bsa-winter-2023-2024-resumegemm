import { type RelationMappings,Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resume.model';
import { UserModel } from '~/bundles/users/users';
import { AbstractModel, DatabaseTableName } from '~/common/database/database';

class TemplateModel extends AbstractModel {
    public 'isOwner': boolean;
    public 'deletedAt': string;
    public 'userId': string;
    public 'resumeId': string;

    public static override get tableName(): typeof DatabaseTableName.TEMPLATES {
        return DatabaseTableName.TEMPLATES;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resumes: {
                relation: Model.HasOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.TEMPLATES}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.TEMPLATES}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { TemplateModel };
