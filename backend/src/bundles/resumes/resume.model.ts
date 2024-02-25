import { type RelationMappings, Model } from 'objection';

import { TemplateModel } from '~/bundles/templates/template.model.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ResumeModel extends AbstractModel {
    public 'resumeTitle': string;
    public 'image': string;
    public 'userId': string;
    public 'templateId': string;

    public static override get tableName(): typeof DatabaseTableName.RESUMES {
        return DatabaseTableName.RESUMES;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
            templates: {
                relation: Model.HasManyRelation,
                modelClass: TemplateModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.templateId`,
                    to: `${DatabaseTableName.TEMPLATES}.id`,
                },
            },
        };
    }
}

export { ResumeModel };
