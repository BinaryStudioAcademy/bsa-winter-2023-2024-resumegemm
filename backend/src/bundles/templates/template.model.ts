import { type RelationMappings,Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import { UserModel } from '~/bundles/users/users.js';
import { AbstractModel, DatabaseTableName } from '~/common/database/database.js';

class TemplateModel extends AbstractModel {
    public 'isOwner': boolean;
    public 'deletedAt': string;
    public 'image': string;
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
                relation: Model.ManyToManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.TEMPLATES}.id`,
                    through: {
                        from: `${DatabaseTableName.USER_TEMPLATES}.templateId`,
                        to: `${DatabaseTableName.USER_TEMPLATES}.userId`
                    },
                    to: `${DatabaseTableName.USERS}.id`
                },
            },
        };
    }
}

export { TemplateModel };
