import { type RelationMappings, Model } from 'objection';

import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type TemplateBlockSettings } from './types/types.js';

class TemplateModel extends AbstractModel {
    public 'isOwner': boolean;
    public 'deletedAt': string;
    public 'templateSettings': TemplateBlockSettings;

    public static override get tableName(): typeof DatabaseTableName.TEMPLATES {
        return DatabaseTableName.TEMPLATES;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.TEMPLATES}.id`,
                    through: {
                        from: `${DatabaseTableName.USER_TEMPLATES}.templateId`,
                        to: `${DatabaseTableName.USER_TEMPLATES}.userId`,
                    },
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { TemplateModel };
