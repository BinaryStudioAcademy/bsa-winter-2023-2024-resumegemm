import { type RelationMappings, Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import { TemplateModel } from '~/bundles/templates/template.model.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    DatabaseTableName,
} from '~/common/database/database.js';

class RecentlyViewedModel extends Model {
    public 'id': string;

    public 'viewedAt': string;

    public 'userId': string;

    public 'resumeId': string;

    public 'templateId': string;

    public $beforeInsert(): void {
        this.id = uuidv4();
        this.viewedAt = new Date().toISOString();
    }

    public static get tableName(): typeof DatabaseTableName.RECENTLY_VIEWED {
        return DatabaseTableName.RECENTLY_VIEWED;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.RECENTLY_VIEWED}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
            resumes: {
                relation: Model.HasOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.RECENTLY_VIEWED}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
            templates: {
                relation: Model.HasOneRelation,
                modelClass: TemplateModel,
                join: {
                    from: `${DatabaseTableName.RECENTLY_VIEWED}.templateId`,
                    to: `${DatabaseTableName.TEMPLATES}.id`,
                },
            },
        };
    }
}

export { RecentlyViewedModel };
